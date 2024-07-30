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
    const images = req.files;

    try {
        // Build the product data object conditionally
        const productData = {
            name,
            description,
            price: parseFloat(price),
            sku,
            category: { connect: { id: categoryId } },
            subcategory: subcategoryId ? { connect: { id: subcategoryId } } : undefined,
            discount: discountId ? { connect: { id: discountId } } : undefined,
            images: images && images.length > 0 ? {
                create: images.map(file => ({
                    url: `/uploads/${file.filename}`
                }))
            } : undefined,
            // Include inventory only if inventoryId is provided
            inventory: inventoryId ? { connect: { id: inventoryId } } : undefined
        };

        // Remove undefined fields from productData
        Object.keys(productData).forEach(key => {
            if (productData[key] === undefined) {
                delete productData[key];
            }
        });

        // Create the product with the cleaned productData object
        const product = await prisma.product.create({
            data: productData,
            include: { images: true, category: true, subcategory: true, inventory: true, discount: true }
        });

        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the product by ID
        const product = await prisma.product.findUnique({
            where: { id },
            include: { images: true, category: true, subcategory: true, inventory: true, discount: true }
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error retrieving product by ID:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Update Product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, sku, categoryId, subcategoryId, inventoryId, discountId } = req.body;
    const images = req.files;

    try {
        // Prepare the update data
        const updateData = {
            name,
            description,
            price: parseFloat(price),
            sku,
            category: categoryId ? { connect: { id: categoryId } } : undefined,
            subcategory: subcategoryId ? { connect: { id: subcategoryId } } : undefined,
            discount: discountId ? { connect: { id: discountId } } : undefined,
            inventory: inventoryId ? { connect: { id: inventoryId } } : undefined,
            images: images && images.length > 0 ? {
                create: images.map(file => ({
                    url: `/uploads/${file.filename}`
                }))
            } : undefined,
        };

        // Remove undefined fields from updateData
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        // Update the product
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: updateData,
            include: { images: true, category: true, subcategory: true, inventory: true, discount: true }
        });

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        await prisma.product.delete({ where: { id } });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
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
    // Extract query parameters
    const { page = 1, pageSize = 10, categoryId, subcategoryId, search } = req.query;

    try {
        // Validate and parse pagination parameters
        const pageNumber = parseInt(page, 10);
        const pageSizeNumber = parseInt(pageSize, 10);

        if (isNaN(pageNumber) || isNaN(pageSizeNumber) || pageNumber < 1 || pageSizeNumber < 1) {
            return res.status(400).json({ message: 'Invalid pagination parameters' });
        }

        // Define pagination options
        const skip = (pageNumber - 1) * pageSizeNumber;
        const take = pageSizeNumber;

        // Build the query filter
        const filter = {};

        // Add categoryId to the filter if it's defined
        if (categoryId) {
            filter.categoryId = categoryId;
        }

        // Add subcategoryId to the filter if it's defined and not null
        if (subcategoryId !== undefined && subcategoryId !== null) {
            filter.subcategoryId = subcategoryId;
        }

        // Add search filter if it's defined
        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        // Log the filter and pagination for debugging
        console.log('Query Filter:', filter);
        console.log('Pagination:', { skip, take });

        // Fetch the products with the constructed filter and pagination
        const products = await prisma.product.findMany({
            where: filter,
            skip,
            take,
            select: {
                id: true,         // Include the id
                name: true,
                price: true,
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });

        // Log fetched products for debugging
        console.log('Fetched Products:', products);

        res.json(products);  // Return the products array directly
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const getProductByName = async (req, res) => {
    const { name } = req.query; // Assuming the name is provided as a query parameter

    try {
        // Find products by name
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: name, // Use contains for partial matching
                    mode: 'insensitive' // Case-insensitive search
                }
            },
            include: { images: true, category: true, subcategory: true, inventory: true, discount: true }
        });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Error retrieving products by name:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get Products by Category
export const getProductsByCategory = async (req, res) => {
    const { categoryName } = req.params;
    const { page = 1, pageSize = 10 } = req.query;

    try {
        const pageNumber = parseInt(page, 10);
        const pageSizeNumber = parseInt(pageSize, 10);

        if (isNaN(pageNumber) || isNaN(pageSizeNumber) || pageNumber < 1 || pageSizeNumber < 1) {
            return res.status(400).json({ message: 'Invalid pagination parameters' });
        }

        const skip = (pageNumber - 1) * pageSizeNumber;
        const take = pageSizeNumber;

        const products = await prisma.product.findMany({
            where: { categoryName },
            skip,
            take,
            include: { images: true, category: true, subcategory: true, inventory: true, discount: true },
        });

        res.json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
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
export const getSubcategoriesByCategoryId = async (req, res) => {
    const { categoryId } = req.query;

    if (!categoryId) {
        return res.status(400).json({ message: 'Category ID is required' });
    }

    try {
        const subcategories = await prisma.subcategory.findMany({
            where: { parentCategoryId: categoryId },
        });
        res.json(subcategories);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

