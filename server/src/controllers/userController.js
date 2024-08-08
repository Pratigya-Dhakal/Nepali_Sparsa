import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateVerificationToken, verifyVerificationToken, generateTokens } from '../utils/tokenUtils.js';
import sendEmail from '../utils/sendEmail.js';

const prisma = new PrismaClient();

export const userSignup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
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
                role: 'USER',
                verify: 'NOTVERIFIED',
            },
        });

        const { verificationToken } = generateVerificationToken(user.id, user.role, '1h');
        const verificationUrl = `${req.protocol}://${req.get('host')}/api/users/verify-email?token=${verificationToken}`;

        await sendEmail(email, 'Email Verification', `Please verify your email by clicking the following link: ${verificationUrl}`);

        res.status(201).json({ message: 'Verification email sent. Please check your email.' });
    } catch (error) {
        console.error('User signup error:', error);
        res.status(400).json({ message: 'User registration failed', error: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { token } = req.query;
    try {
        const decoded = verifyVerificationToken(token);

        if (!decoded) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        await prisma.user.update({
            where: { id: decoded.userId },
            data: { verify: 'VERIFIED' },
        });

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Email verification error:', error);
        res.status(400).json({ message: 'Invalid or expired token', error: error.message });
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
            return res.status(403).json({ message: 'Not authorized as a user' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        if (user.verify !== 'VERIFIED') {
            return res.status(403).json({ message: 'Please verify your email to log in.' });
        }

        const { accessToken, refreshToken } = generateTokens(user.id, user.role);
        res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const resendVerificationEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.verify === 'VERIFIED') {
            return res.status(400).json({ message: 'Email is already verified' });
        }

        const { verificationToken } = generateVerificationToken(user.id, user.role, '1h');
        const verificationUrl = `${req.protocol}://${req.get('host')}/api/users/verify-email?token=${verificationToken}`;

        await sendEmail(email, 'Email Verification', `Please verify your email by clicking the following link: ${verificationUrl}`);

        res.status(200).json({ message: 'Verification email resent. Please check your email.' });
    } catch (error) {
        console.error('Resend verification email error:', error);
        res.status(400).json({ message: 'Failed to resend verification email', error: error.message });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { verificationToken } = generateVerificationToken(user.id);
        const resetUrl = `${req.protocol}://${req.get('host')}/api/users/reset-password?token=${verificationToken}`;

        await sendEmail(email, 'Password Reset', `Please reset your password by clicking the following link: ${resetUrl}`);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Error processing request', error: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password are required.' });
    }

    const decoded = verifyVerificationToken(token);
    if (!decoded) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: decoded.userId },
            data: { password: hashedPassword }
        });
        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Error updating password.', error: error.message });
    }
};

export const searchItems = async (req, res) => {
    const { query } = req.query;

    try {
        const items = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                ],
            },
        });

        res.json(items);
    } catch (error) {
        console.error('Search items error:', error);
        res.status(500).json({ message: 'Error searching items', error: error.message });
    }
};

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
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
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
};

export const deleteFromCart = async (req, res) => {
    const { itemId } = req.params;

    try {
        await prisma.cartItem.delete({
            where: { id: itemId },
        });

        res.status(204).json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Delete from cart error:', error);
        res.status(500).json({ message: 'Error removing item from cart', error: error.message });
    }
};

export const confirmOrder = async (req, res) => {
    const { items, total } = req.body;
    const userId = req.user.id;

    try {
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
    } catch (error) {
        console.error('Confirm order error:', error);
        res.status(500).json({ message: 'Error confirming order', error: error.message });
    }
};
