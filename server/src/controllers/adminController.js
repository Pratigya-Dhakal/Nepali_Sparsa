import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js';
import { generateVerificationToken, verifyVerificationToken, generateTokens } from '../utils/tokenUtils.js';

const prisma = new PrismaClient();

export const adminSignup = async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        // Check if email already exists
        const existingAdmin = await prisma.user.findUnique({ where: { email } });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const admin = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: "ADMIN",
                verify: 'NOTVERIFIED',
            },
        });

        const { verificationToken } = generateVerificationToken(admin.id, admin.role, '1h');
        const verificationUrl = `${req.protocol}://${req.get('host')}/api/admin/verify-email?token=${verificationToken}`;

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

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await prisma.user.findUnique({ where: { email } });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (admin.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Not authorized as an admin' });
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        if (admin.verify !== 'VERIFIED') {
            return res.status(403).json({ message: 'Please verify your email to log in.' });
        }

        const { accessToken, refreshToken } = generateTokens(admin.id, admin.role);
        res.status(200).json({ message: 'Login Successful', accessToken, refreshToken });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


export const resendVerificationEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const admin = await prisma.user.findUnique({ where: { email } });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (admin.verify === 'VERIFIED') {
            return res.status(400).json({ message: 'Email is already verified' });
        }

        const { verificationToken } = generateVerificationToken(admin.id, admin.role, '1h');
        const verificationUrl = `${req.protocol}://${req.get('host')}/api/admin/verify-email?token=${verificationToken}`;

        await sendEmail(email, 'Email Verification', `Please verify your email by clicking the following link: ${verificationUrl}`);

        res.status(200).json({ message: 'Verification email resent. Please check your email.' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to resend verification email', error });
    }
};
export const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.productCategory.findMany({
            include: { subcategories: true, image: true },
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const addCategory = async (req, res) => {
    const { name, description } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Get uploaded file path

    try {
        // Check if a category with the same name already exists
        const existingCategory = await prisma.productCategory.findFirst({
            where: { name },
        });

        if (existingCategory) {
            return res.status(400).json({ message: 'Category name already exists' });
        }

        // Create new category
        const category = await prisma.productCategory.create({
            data: {
                name,
                description,
                image: imageUrl ? { create: { url: imageUrl } } : undefined,
            },
        });

        res.status(201).json(category);
    } catch (error) {
        console.error('Error creating category:', error); // Log the error to understand what went wrong
        res.status(500).json({ message: 'Cannot create Category' });
    }
};

export const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Get uploaded file path
    try {
        const category = await prisma.productCategory.update({
            where: { id: categoryId },
            data: { 
                name, 
                description,
                image: imageUrl ? { upsert: { create: { url: imageUrl }, update: { url: imageUrl } } } : undefined,
            },
        });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const addProduct = async (req, res) => {
    const { name, description, price, sku, categoryId, subcategoryId, inventoryId, discountId } = req.body;
    const imageUrls = req.files ? req.files.map(file => file.path) : []; // Get uploaded file paths
    try {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                sku,
                category: { connect: { id: categoryId } },
                subcategory: { connect: { id: subcategoryId } },
                inventory: { connect: { id: inventoryId } },
                discount: discountId ? { connect: { id: discountId } } : undefined,
                images: { create: imageUrls.map(url => ({ url })) },
            },
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, sku, categoryId, subcategoryId, inventoryId, discountId } = req.body;
    const imageUrls = req.files ? req.files.map(file => file.path) : []; // Get uploaded file paths
    try {
        const product = await prisma.product.update({
            where: { id: productId },
            data: {
                name,
                description,
                price,
                sku,
                category: { connect: { id: categoryId } },
                subcategory: { connect: { id: subcategoryId } },
                inventory: { connect: { id: inventoryId } },
                discount: discountId ? { connect: { id: discountId } } : undefined,
                images: { deleteMany: {}, create: imageUrls.map(url => ({ url })) },
            },
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        await prisma.productCategory.delete({ where: { id: categoryId } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        await prisma.product.delete({ where: { id: productId } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getProductsByCategory = async (req, res) => {
    const { categoryName } = req.params;
    try {
        const category = await prisma.productCategory.findUnique({
            where: { name: categoryName },
            include: { products: true },
        });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(category.products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await prisma.productCategory.findUnique({
            where: { id: req.params.id },
        });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const replyToComment = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    try {
        const comment = await prisma.comment.findUnique({ where: { id: commentId } });

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const reply = await prisma.reply.create({
            data: {
                content,
                commentId,
                userId: req.user.id, // Assuming the logged-in admin user is making the reply
            },
        });

        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getOrderedItemsList = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: true,
                user: true,
            },
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
// Subcategory CRUD operations
export const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await prisma.subcategory.findMany();
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const addSubcategory = async (req, res) => {
    const { name, description, parentCategoryId } = req.body;
    try {
        const subcategory = await prisma.subcategory.create({
            data: {
                name,
                description,
                parentCategoryId
            }
        });
        res.json(subcategory);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateSubcategory = async (req, res) => {
    const { subcategoryId } = req.params;
    const { name, description, parentCategoryId } = req.body;
    try {
        const subcategory = await prisma.subcategory.update({
            where: { id: subcategoryId },
            data: { name, description, parentCategoryId }
        });
        res.json(subcategory);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteSubcategory = async (req, res) => {
    const { subcategoryId } = req.params;
    try {
        await prisma.subcategory.delete({ where: { id: subcategoryId } });
        res.json({ message: 'Subcategory deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    
    try {
        const admin = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const { resetToken } = generateResetToken(admin.id);
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
            where: { id: decoded.adminId },
            data: { password: hashedPassword },
        });

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error processing request', error });
    }
};
//Get user by id
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Delete user by ID
export const deleteUserById = async (req, res) => {
    const { id } = req.params; // Ensure the parameter name matches the route
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await prisma.user.delete({ where: { id } });
        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Search users by name
export const searchUserByName = async (req, res) => {
    const { name } = req.params;
    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { firstName: { contains: name, mode: 'insensitive' } },
                    { lastName: { contains: name, mode: 'insensitive' } }
                ]
            }
        });
        res.json(users);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
export const getUserDetailById = async (req, res) => {
    const { id: userId } = req.params; // Retrieve the userId from req.params

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                address: true,
                orders: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};