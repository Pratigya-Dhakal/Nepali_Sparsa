// src/controllers/productController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all products with optional filters
export const getAllProducts = async (req, res) => {
    const { page = 0, limit = 20 } = req.query; // Default to page 0 and limit 20 if not provided

    try {
        const products = await prisma.product.findMany({
            skip: page * limit,
            take: parseInt(limit),
            include: {
                images: true,
                category: true,
                subcategory: true,
                discount: true,
                orderItems: true,
                cartItems: true,
                comments: true,
            }
        });

        // Fetch total count of products for pagination info
        const totalCount = await prisma.product.count();

        res.json({ products, totalCount });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get products by name
export const getProductByName = async (req, res) => {
    const { name } = req.params; // Use req.params for URL parameters
    try {
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
            include: {
                images: true,
                category: true,
                subcategory: true,
                discount: true,
                orderItems: true,
                cartItems: true,
                comments: true,
            },
        });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
    const { categoryName } = req.params;
    try {
        const products = await prisma.product.findMany({
            where: {
                category: {
                    name: categoryName
                }
            },
            include: {
                images: true,
                category: true,
                subcategory: true,
                discount: true,
                orderItems: true,
                cartItems: true,
                comments: true,
            }
        });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a product by ID
export const getProductById = async (req, res) => {
    const { id } = req.params;

    if (!id || id.length !== 24) { // MongoDB ObjectId is 24 hex characters
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                images: true,
                category: true,
                subcategory: true,
                discount: true,
                comments: true,
            }
        });

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get similar products by category
export const getSimilarProducts = async (req, res) => {
    const { categoryName } = req.params;

    if (!categoryName) {
        console.error('Category name is missing in request');
        return res.status(400).json({ error: 'Category name is required' });
    }

    try {
        // Log the received category name
        console.log(`Received categoryName: ${categoryName}`);

        // Find the category by name
        const category = await prisma.productCategory.findUnique({
            where: { name: categoryName }
        });

        if (!category) {
            console.error('Category not found');
            return res.status(404).json({ error: 'Category not found' });
        }

        // Fetch products under this category
        const products = await prisma.product.findMany({
            where: {
                categoryId: category.id
            },
            include: {
                images: true,
                category: true,
                subcategory: true,
                discount: true,
                comments: true,
            }
        });

        if (!products.length) {
            console.error('No similar products found');
            return res.status(404).json({ message: 'No similar products found' });
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching similar products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
