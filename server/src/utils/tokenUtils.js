import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const VERIFICATION_SECRET = process.env.JWT_VERIFICATION_SECRET;

export const generateTokens = (userId, role, expiresIn = '2h', refreshExpiresIn = '7d') => {
    const accessToken = jwt.sign({ userId, role }, SECRET, { expiresIn });
    const refreshToken = jwt.sign({ userId, role }, REFRESH_SECRET, { expiresIn: refreshExpiresIn });
    return { accessToken, refreshToken };
};

export const generateVerificationToken = (userId, role, expiresIn = '10m') => {
    const verificationToken = jwt.sign({ userId, role }, VERIFICATION_SECRET, { expiresIn });
    return { verificationToken };
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
};

export const verifyVerificationToken = (token) => {
    try {
        if (!token) throw new Error('Token is missing.');
        return jwt.verify(token, VERIFICATION_SECRET);
    } catch (error) {
        console.error('Token verification error:', error.message);
        return null;
    }
};

export const verifyRefreshToken = (refreshToken) => {
    try {
        return jwt.verify(refreshToken, REFRESH_SECRET);
    } catch (error) {
        console.error('Refresh token verification error:', error);
        return null;
    }
};
