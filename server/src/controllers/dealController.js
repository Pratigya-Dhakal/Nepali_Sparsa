import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addDeal = async (req, res) => {
    const {
        title,
        categoryId,
        subcategoryId,
        discount,
        image,
        newPrice,
        oldPrice,
        rating,
        description,
        startDate,
        endDate,
        type,
        productId
    } = req.body;

    try {
        const deal = await prisma.deal.create({
            data: {
                title,
                categoryId: categoryId || null, // Ensure categoryId is null if not provided
                subcategoryId: subcategoryId || null, // Ensure subcategoryId is null if not provided
                discount: discount.toString(), // Ensure discount is a string
                image,
                newPrice: parseFloat(newPrice) || 0, // Ensure price is a float, with a fallback value
                oldPrice: parseFloat(oldPrice) || 0, // Ensure price is a float, with a fallback value
                rating: parseFloat(rating) || 0, // Ensure rating is a float, with a fallback value
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                type,
                productId: productId || null // Set productId to null if not provided
            }
        });

        res.status(201).json(deal);
    } catch (error) {
        console.error('Error adding deal:', error.message);
        res.status(500).json({ error: 'An error occurred while adding the deal.' });
    }
};

export const getDeals = async (req, res) => {
    try {
        const deals = await prisma.deal.findMany({
            include: {
                product: true, // Include the related product
                category: true,
                subcategory: true
            }
        });
        res.status(200).json(deals);
    } catch (error) {
        console.error('Error fetching deals:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getDealById = async (req, res) => {
    const { id } = req.params;

    try {
        const deal = await prisma.deal.findUnique({
            where: { id },
            include: {
                product: true,  // Include the related product
                category: true,
                subcategory: true
            }
        });

        if (deal) {
            res.status(200).json(deal);
        } else {
            res.status(404).json({ message: 'Deal not found' });
        }
    } catch (error) {
        console.error('Error fetching deal:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateDeal = async (req, res) => {
    const { id } = req.params;
    const {
        type,
        categoryId,
        subcategoryId,
        discount,
        image,
        title,
        newPrice,
        oldPrice,
        rating,
        description,
        startDate,
        endDate,
        productId
    } = req.body;

    try {
        const updatedDeal = await prisma.deal.update({
            where: { id },
            data: {
                type,
                categoryId: categoryId || null,
                subcategoryId: subcategoryId || null,
                discount: discount.toString(),
                image,
                title,
                newPrice: parseFloat(newPrice) || 0,
                oldPrice: parseFloat(oldPrice) || 0,
                rating: parseFloat(rating) || 0,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                productId: productId || null
            }
        });

        res.status(200).json(updatedDeal);
    } catch (error) {
        console.error('Error updating deal:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteDeal = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.deal.delete({
            where: { id }
        });

        res.status(200).json({ message: 'Deal deleted successfully' });
    } catch (error) {
        console.error('Error deleting deal:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
