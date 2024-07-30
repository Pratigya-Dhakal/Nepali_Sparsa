import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create a new discount
export const createDiscount = async (req, res) => {
    const { name, description, discountPercent, active } = req.body;

    try {
        const discount = await prisma.discount.create({
            data: { name, description, discountPercent, active },
        });
        res.status(201).json(discount);
    } catch (error) {
        console.error('Error creating discount:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all discounts
export const getAllDiscounts = async (req, res) => {
    try {
        const discounts = await prisma.discount.findMany();
        res.status(200).json(discounts);
    } catch (error) {
        console.error('Error fetching discounts:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a discount by ID
export const getDiscountById = async (req, res) => {
    const { id } = req.params;

    try {
        const discount = await prisma.discount.findUnique({
            where: { id },
        });
        if (discount) {
            res.status(200).json(discount);
        } else {
            res.status(404).json({ message: 'Discount not found' });
        }
    } catch (error) {
        console.error('Error fetching discount:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a discount by ID
export const updateDiscount = async (req, res) => {
    const { id } = req.params;
    const { name, description, discountPercent, active } = req.body;

    try {
        const discount = await prisma.discount.update({
            where: { id },
            data: { name, description, discountPercent, active },
        });
        res.status(200).json(discount);
    } catch (error) {
        console.error('Error updating discount:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a discount by ID
export const deleteDiscount = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.discount.delete({
            where: { id },
        });
        res.status(200).json({ message: 'Discount deleted successfully' });
    } catch (error) {
        console.error('Error deleting discount:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};