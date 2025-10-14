const jwt = require('jsonwebtoken'); // decode and verify tokens

const verifyToken = (req, res, next) => {
    try {
        // 1. Get token from Authorization header
        const authHeader = req.headers.authorization; // "Bearer <token>"
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1]; // extract token

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach user info to request
        req.user = {
            id: decoded.userId,
            isAdmin: decoded.isAdmin
        };

        // 4. Proceed to next middleware or route
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

const requireAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

module.exports = { verifyToken, requireAdmin };
