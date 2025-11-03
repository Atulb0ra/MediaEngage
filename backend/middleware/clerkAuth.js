import {Clerk} from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

dotenv.config();

const clerk = new Clerk({
    apiKey : process.env.CLERK_SECRET_KEY,
});

export const requireAuth = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authHeader.replace('Bearer', '');
        const {userId} = await clerk.sessions.verifyToken(token);
        req.userId = userId;
        next();
    }
    catch(error){
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};