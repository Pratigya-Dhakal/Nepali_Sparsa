const { prisma } = require('../config/db');

exports.createOrder = async (req, res) => {
const { userId, total, items } = req.body;

try {
    const order = await prisma.order.create({
    data: {
        userId,
        total,
        items: {
        create: items,
        },
    },
    });
    res.json(order);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
}
};
