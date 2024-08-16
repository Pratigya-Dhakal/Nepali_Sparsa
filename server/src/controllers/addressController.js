import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get User Address
export const getAddress = async (req, res) => {
    try {
        const address = await prisma.userAddress.findUnique({
            where: { userId: req.user.id },
        });

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.json(address);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update or Create User Address
export const updateAddress = async (req, res) => {
    const { address1, address2, city, state, country, postalCode } = req.body;
    try {
        const existingAddress = await prisma.userAddress.upsert({
            where: { userId: req.user.id },
            update: {
                address1,
                address2,
                city,
                state,
                country,
                postalCode,
            },
            create: {
                userId: req.user.id,
                address1,
                address2,
                city,
                state,
                country,
                postalCode,
            },
        });

        res.json({ message: 'Address updated successfully', address: existingAddress });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete User Address
export const deleteAddress = async (req, res) => {
    try {
        await prisma.userAddress.delete({
            where: { userId: req.user.id },
        });

        res.json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};