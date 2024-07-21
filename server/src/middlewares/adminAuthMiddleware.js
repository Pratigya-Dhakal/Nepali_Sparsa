import { verifyToken } from '../utils/tokenUtils.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = verifyToken(token);

            if (!decoded) {
                return res.status(401).json({ message: 'Not authorized, token failed' });
            }

            req.user = await prisma.user.findUnique({ where: { id: decoded.userId } });

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            if (req.user.verify !== 'VERIFIED') {
                return res.status(403).json({ message: 'Please verify your email to access this resource' });
            }

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};
