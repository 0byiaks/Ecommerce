const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/order');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const jwt = require('jsonwebtoken');
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// POST /api/orders - Create new order (checkout)
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('🛒 Checkout request from user:', req.user.userId);
    
    const user = await User.findById(req.user.userId).populate('cart.productId');
    if (!user) {
      console.log('❌ User not found:', req.user.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('👤 User found, cart items:', user.cart.length);

    if (user.cart.length === 0) {
      console.log('❌ Cart is empty');
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total
    const total = user.cart.reduce((sum, item) => {
      return sum + (item.productId.price * item.quantity);
    }, 0);

    console.log('💰 Total calculated:', total);

    // Create order in database
    const orderData = {
      userId: user._id,
      items: user.cart.map(item => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity
      })),
      total: total,
      status: 'pending'
    };

    console.log('📦 Creating order with data:', orderData);

    // For now, let's create a simple order object and store it in the user
    const order = {
      _id: new Date().getTime().toString(), // Simple ID
      ...orderData,
      createdAt: new Date()
    };

    // Store order in user's orders array (we'll add this field)
    if (!user.orders) {
      user.orders = [];
    }
    user.orders.push(order);
    await user.save();

    console.log('✅ Order saved:', order._id);

    // Clear the cart
    user.cart = [];
    await user.save();

    console.log('🛒 Cart cleared');

    res.status(201).json({ 
      message: 'Order placed successfully!', 
      order: order 
    });
  } catch (error) {
    console.error('❌ Order creation error:', error);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// GET /api/orders - Get user's orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const orders = user.orders || [];
    // Sort by creation date (most recent first)
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json({ orders: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
