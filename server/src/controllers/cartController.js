import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Add an item to the user's cart.
 */
export const addItemToCart = async (req, res, next) => {
    const { productId, quantity } = req.body;

    try {
        // Find the product to ensure it exists
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the item already exists in the cart
        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                productId,
                cart: { userId: req.user.id },
            },
        });

        let cartItem;
        if (existingCartItem) {
            // Update the quantity if the item is already in the cart
            cartItem = await prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + quantity },
            });
        } else {
            // Create a new cart item
            cartItem = await prisma.shoppingCart.upsert({
                where: { userId: req.user.id },
                update: {
                    items: {
                        create: { productId, quantity },
                    },
                },
                create: {
                    userId: req.user.id,
                    items: {
                        create: { productId, quantity },
                    },
                },
            });
        }

        res.status(201).json(cartItem);
    } catch (error) {
        next(error);
    }
};

/**
 * Remove an item from the user's cart.
 */
export const removeItemFromCart = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Find the cart item to ensure it exists and belongs to the user
        const cartItem = await prisma.cartItem.findUnique({
            where: { id },
            include: {
                cart: true, // Fetch the associated cart
            },
        });

        if (!cartItem || cartItem.cart.userId !== req.user.id) {
            return res.status(404).json({ message: 'Item not found in your cart' });
        }

        // Delete the cart item
        await prisma.cartItem.delete({
            where: { id },
        });

        res.status(204).json({ message: 'Item removed from cart' });
    } catch (error) {
        next(error);
    }
};

/**
 * Get all items in the user's cart.
 */
export const getCartItems = async (req, res, next) => {
    try {
        // Fetch the user's cart along with the items and their associated product details
        const cartItems = await prisma.cartItem.findMany({
            where: {
                cart: { userId: req.user.id },
            },
            include: {
                product: true, // Include product details in the response
            },
        });

        if (!cartItems.length) {
            return res.status(404).json({ message: 'No items found in your cart' });
        }

        res.status(200).json(cartItems);
    } catch (error) {
        next(error);
    }
};
