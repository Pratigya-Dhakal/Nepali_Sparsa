const { prisma } = require('../config/db');

exports.getAllProducts = async (req, res) => {
try {
    const products = await prisma.product.findMany();
    res.json(products);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
}
};

exports.getProductById = async (req, res) => {
try {
    const product = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!product) {
    return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
}
};
