import { verifyToken } from '@clerk/backend';
import dotenv from 'dotenv';

dotenv.config();

export const requireAuth = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authHeader.replace('Bearer ', '').trim();
         // verify token and be tolerant about claim names (Clerk may return sub or userId)
         const payload = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY,
        });

        const userId = payload?.userId || payload?.sub || payload?.uid || payload?.subject;
        if (!userId) {
            console.error('verifyToken did not return a user id:', payload);
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = userId;
        next();
    }
    catch(error){
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};