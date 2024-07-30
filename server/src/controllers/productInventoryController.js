import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create a new inventory
export const createInventory = async (req, res) => {
    const { quantity } = req.body;

    try {
        const inventory = await prisma.productInventory.create({
            data: { quantity },
        });
        res.status(201).json(inventory);
    } catch (error) {
        console.error('Error creating inventory:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all inventories
export const getAllInventories = async (req, res) => {
    try {
        const inventories = await prisma.productInventory.findMany();
        res.status(200).json(inventories);
    } catch (error) {
        console.error('Error fetching inventories:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get an inventory by ID
export const getInventoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const inventory = await prisma.productInventory.findUnique({
            where: { id },
        });
        if (inventory) {
            res.status(200).json(inventory);
        } else {
            res.status(404).json({ message: 'Inventory not found' });
        }
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update an inventory by ID
export const updateInventory = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        const inventory = await prisma.productInventory.update({
            where: { id },
            data: { quantity },
        });
        res.status(200).json(inventory);
    } catch (error) {
        console.error('Error updating inventory:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete an inventory by ID
export const deleteInventory = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.productInventory.delete({
            where: { id },
        });
        res.status(200).json({ message: 'Inventory deleted successfully' });
    } catch (error) {
        console.error('Error deleting inventory:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
