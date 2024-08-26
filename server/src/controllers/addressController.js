import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createAddress = async (req, res) => {
try {
    const { userId, address1, address2, city, state, country, postalCode } = req.body;

    const newAddress = await prisma.userAddress.create({
    data: {
        userId,
        address1,
        address2,
        city,
        state,
        country,
        postalCode,
    },
    });

    res.status(201).json(newAddress);
} catch (error) {
    res.status(500).json({ error: 'Failed to create address' });
}
};

export const updateAddress = async (req, res) => {
try {
    const { addressId } = req.params;
    const { address1, address2, city, state, country, postalCode } = req.body;

    const updatedAddress = await prisma.userAddress.update({
    where: { id: addressId },
    data: {
        address1,
        address2,
        city,
        state,
        country,
        postalCode,
    },
    });

    res.status(200).json(updatedAddress);
} catch (error) {
    res.status(500).json({ error: 'Failed to update address' });
}
};

export const deleteAddress = async (req, res) => {
try {
    const { addressId } = req.params;

    await prisma.userAddress.delete({
    where: { id: addressId },
    });

    res.status(200).json({ message: 'Address deleted successfully' });
} catch (error) {
    res.status(500).json({ error: 'Failed to delete address' });
}
};

export const getUserAddresses = async (req, res) => {
try {
    const { userId } = req.params;

    const addresses = await prisma.userAddress.findMany({
    where: { userId },
    });

    res.status(200).json(addresses);
} catch (error) {
    res.status(500).json({ error: 'Failed to retrieve addresses' });
}
};
