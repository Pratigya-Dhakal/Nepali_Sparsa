const prisma = require('../models');

const addItemToCart = async (req, res, next) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await prisma.shoppingCart.upsert({
            where: { userId: req.user.id },
            update: {
                items: {
                    create: { productId, quantity }
                }
            },
            create: {
                userId: req.user.id,
                items: {
                    create: { productId, quantity }
                }
            }
        });

        res.status(201).json(cart);
    } catch (error) {
        next(error);
    }
};

const removeItemFromCart = async (req, res, next) => {
    const { id } = req.params;

    try {
        await prisma.cartItem.delete({
            where: { id }
        });

        res.status(204).json({ message: 'Item removed from cart' });
    } catch (error) {
        next(error);
    }
};

module.exports = { addItemToCart, removeItemFromCart };
