import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import nodemailer from 'nodemailer';

// Place an Order
export const placeOrder = async (req, res) => {
    const { items, total } = req.body;

    try {
        // Fetch the user's address
        const address = await prisma.userAddress.findUnique({
            where: { userId: req.user.id },
        });

        if (!address) {
            return res.status(400).json({ message: 'Address not found' });
        }

        // Create a new order
        const newOrder = await prisma.order.create({
            data: {
                userId: req.user.id,
                total,
                items: {
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        // Send confirmation email
        await sendOrderConfirmationEmail(req.user.email, newOrder);

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Send Order Confirmation Email
const sendOrderConfirmationEmail = async (email, order) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Order Confirmation',
        text: `
            Hi there,

            Thank you for your purchase!

            Order Details:
            ${order.items.map(item => `- ${item.product.name}: ${item.quantity} x Rs. ${item.price}`).join('\n')}
            - Total: Rs. ${order.total}

            Shipping Address:
            ${order.shippingAddress.address1}
            ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.country} - ${order.shippingAddress.postalCode}

            Your order will be delivered soon.

            Regards,
            Nepali Sparsa
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Order confirmation email sent');
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
};

export const getUserOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await prisma.order.findMany({
            where: {
                userId,
            },
            include: {
                items: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};