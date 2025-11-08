const jwt = require('jsonwebtoken');
const User = require('../graphql/user/User');
require('dotenv').config();

const authenticate = async (req) => {
  try {
    // استخراج التوكن من headers
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (!authHeader) {
      throw new Error('Authentication token is required');
    }

    // التوكن عادة يكون في صيغة "Bearer <token>"
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      throw new Error('Authentication token is required');
    }

    // التحقق من التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // البحث عن المستخدم في قاعدة البيانات
    const user = await User.findById(decoded.id);
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    }
    throw error;
  }
};

module.exports = { authenticate };

