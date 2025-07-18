import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      return next(); // ✅ Stop here if all good
    } catch (error) {
      console.error('Invalid token:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // ✅ Move this outside the if to avoid falling through
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default authMiddleware;
