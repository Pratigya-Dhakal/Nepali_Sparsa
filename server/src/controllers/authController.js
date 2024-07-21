const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../config/db');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}

const { username, email, password, firstName, lastName } = req.body;

try {
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
    return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await prisma.user.create({
    data: {
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
    },
    });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
    if (err) throw err;
    res.json({ token });
    });
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
}
};
