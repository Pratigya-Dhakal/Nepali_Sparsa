import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const protect = async (req, res, next) => {
    let token;

    if (req.cookies.token) {
        try {
        token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
            id: true,
            email: true,
            role: true,
            isVerified: true,
            },
        });

        if (!req.user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email to access this resource' });
        }

        next();
        } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
