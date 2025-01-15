const jwt=require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Auth Header:', authHeader); // Debug log

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'Unauthorized access!' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const verified = jwt.verify(token, 'secretKey');
        console.log('Verified User:', verified); // Debug log
        req.user = verified;
        next();
    } catch (err) {
        console.log('Token verification failed:', err); // Debug log
        res.status(400).json({ error: 'Invalid token!' });
    }
};

const authorizeAdmin = (req, res, next) => {
    // Check if the user has the 'admin' role
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'You are not an Admin!' });
    }
    next(); // Continue if the user is an admin
};

module.exports = { authenticateToken, authorizeAdmin };