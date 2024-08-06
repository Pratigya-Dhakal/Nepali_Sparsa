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
        type
    } = req.body;

    try {
        const deal = await prisma.deal.create({
            data: {
                title,
                categoryId,
                subcategoryId,
                discount: discount.toString(), // Ensure discount is a string
                image,
                newPrice: parseFloat(newPrice),
                oldPrice: parseFloat(oldPrice),
                rating: parseFloat(rating),
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                type,
                productId: null // Or set to the appropriate value
            }
        });

        res.status(201).json(deal);
    } catch (error) {
        console.error('Error adding deal:', error);
        res.status(500).json({ error: 'An error occurred while adding the deal.' });
    }
};


// Similar changes for getDeals, getDealById, updateDeal, and deleteDeal

export const getDeals = async (req, res) => {
    try {
        const deals = await prisma.deal.findMany({
            include: {
                product: true,
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
    try {
        const { id } = req.params;

        // MongoDB ObjectId validation
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid ID format.' });
        }

        const deal = await prisma.deal.findUnique({
            where: { id },
            include: {
                product: true,  // Assuming there's a relation to include product details
            }
        });

        if (deal) {
            res.status(200).json(deal);
        } else {
            res.status(404).json({ message: 'Deal not found' });
        }
    } catch (error) {
        console.error('Error fetching deal:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateDeal = async (req, res) => {
    try {
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

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid ID format.' });
        }

        const deal = await prisma.deal.findUnique({
            where: { id }
        });

        if (!deal) {
            return res.status(404).json({ error: 'Deal not found.' });
        }

        const updatedDeal = await prisma.deal.update({
            where: { id },
            data: {
                type,
                categoryId,
                subcategoryId,
                discount,  // Keep as string if that’s expected
                image,
                title,
                newPrice: parseFloat(newPrice) || 0,
                oldPrice: parseFloat(oldPrice) || 0,
                rating: parseFloat(rating) || 0,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                productId
            },
        });

        res.status(200).json(updatedDeal);
    } catch (error) {
        console.error('Error updating deal:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteDeal = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid ID format.' });
        }

        const deal = await prisma.deal.findUnique({
            where: { id }
        });

        if (!deal) {
            return res.status(404).json({ error: 'Deal not found.' });
        }

        await prisma.deal.delete({
            where: { id }
        });

        res.status(200).json({ message: 'Deal deleted successfully' });
    } catch (error) {
        console.error('Error deleting deal:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
