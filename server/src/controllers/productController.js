import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all products with optional filters
export const getAllProducts = async (req, res) => {
    const { page = 0, limit = 20, category, subcategory, minPrice, maxPrice, size, sort } = req.query;

    try {
        const filters = {};
        if (category) {
            filters.category = { name: category };
        }
        if (subcategory) {
            filters.subcategory = { name: subcategory };
        }
        if (minPrice && maxPrice) {
            filters.price = { gte: parseFloat(minPrice), lte: parseFloat(maxPrice) };
        }
        if (size) {
            filters.size = size;
        }

        const sortOption = {};
        if (sort === 'price-asc') {
            sortOption.price = 'asc';
        } else if (sort === 'price-desc') {
            sortOption.price = 'desc';
        }

        const products = await prisma.product.findMany({
            skip: page * limit,
            take: parseInt(limit),
            where: filters,
            orderBy: sortOption,
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

        const totalCount = await prisma.product.count({ where: filters });

        res.json({ products, totalCount });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get products by name
export const getProductByName = async (req, res) => {
    const { name } = req.params;
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

    try {
        const category = await prisma.productCategory.findUnique({
            where: { name: categoryName }
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

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
            return res.status(404).json({ message: 'No similar products found' });
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching similar products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
