import { verifyToken } from '../utils/tokenUtils.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware to protect routes for authenticated users only
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
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
// Middleware to check if the user has the role 'USER'
export const user = (req, res, next) => {
    if (req.user && req.user.role === 'USER') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as a user' });
    }
};

export const userProtect = [protect, user];
