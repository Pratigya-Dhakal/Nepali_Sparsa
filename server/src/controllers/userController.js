import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateVerificationToken, verifyVerificationToken, generateTokens } from '../utils/tokenUtils.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

const prisma = new PrismaClient();

export const userSignup = async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: "USER",
                verify: 'NOTVERIFIED',
            },
        });

        const { verificationToken } = generateVerificationToken(user.id, user.role, '1h');
        const verificationUrl = `${req.protocol}://${req.get('host')}/api/users/verify-email?token=${verificationToken}`;

        await sendEmail(email, 'Email Verification', `Please verify your email by clicking the following link: ${verificationUrl}`);

        res.status(201).json({ message: 'Verification email sent. Please check your email.' });
    } catch (error) {
        res.status(400).json({ message: 'Admin registration failed', error });
    }
};

export const verifyEmail = async (req, res) => {
    const { token } = req.query;
    try {
        const decoded = verifyVerificationToken(token);

        if (!decoded) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const updatedUser = await prisma.user.update({
            where: { id: decoded.userId },
            data: { verify: 'VERIFIED' },
        });

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token', error });
    }
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (user.role !== 'USER') {
            return res.status(403).json({ message: 'Not authorized as an user' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        if (user.verify !== 'VERIFIED') {
            return res.status(403).json({ message: 'Please verify your email to log in.' });
        }

        const { accessToken, refreshToken } = generateTokens(user.id, user.role);
        res.status(500).json({ message: 'Login Successful', accessToken, refreshToken });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const resendVerificationEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'USER not found' });
        }

        if (user.verify === 'VERIFIED') {
            return res.status(400).json({ message: 'Email is already verified' });
        }

        const { verificationToken } = generateVerificationToken(user.id, user.role, '1h');
        const verificationUrl = `${req.protocol}://${req.get('host')}/api/user/verify-email?token=${verificationToken}`;

        await sendEmail(email, 'Email Verification', `Please verify your email by clicking the following link: ${verificationUrl}`);

        res.status(200).json({ message: 'Verification email resent. Please check your email.' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to resend verification email', error });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { resetToken } = generateResetToken(user.id);
        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password?token=${resetToken}`;

        await sendEmail(email, 'Password Reset', `Please reset your password by clicking the following link: ${resetUrl}`);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error processing request', error });
    }
};

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = verifyResetToken(token);

        if (!decoded) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await prisma.user.update({
            where: { id: decoded.userId },
            data: { password: hashedPassword },
        });

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error processing request', error });
    }
};


export const searchItems = async (req, res) => {
    const { query } = req.query;

    const items = await prisma.product.findMany({
        where: {
        OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
        ],
        },
    });

    res.json(items);
    };

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await prisma.shoppingCart.findUnique({
        where: { userId },
    });

    if (!cart) {
        cart = await prisma.shoppingCart.create({
        data: {
            user: { connect: { id: userId } },
        },
        });
    }

    const item = await prisma.cartItem.create({
        data: {
        cart: { connect: { id: cart.id } },
        product: { connect: { id: productId } },
        quantity,
        },
    });

    res.status(201).json(item);
    };

export const deleteFromCart = async (req, res) => {
    const { itemId } = req.params;

    await prisma.cartItem.delete({
        where: { id: itemId },
    });

    res.status(204).json({ message: 'Item removed from cart' });
    };

    export const confirmOrder = async (req, res) => {
    const { items, total } = req.body;
    const userId = req.user.id;

    const order = await prisma.order.create({
        data: {
        user: { connect: { id: userId } },
        total,
        items: {
            create: items.map(item => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            price: item.price,
            })),
        },
        },
    });

    res.status(201).json(order);
};
