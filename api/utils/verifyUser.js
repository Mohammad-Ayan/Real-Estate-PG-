import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token =
        req.headers['authorization'] || // Direct token from Authorization header
        req.cookies.access_token; // Or token from cookies

    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(403, 'Forbidden'));
        }
        req.user = user; // Attach the user to the request object
        next(); // Continue to the next middleware
    });
};
