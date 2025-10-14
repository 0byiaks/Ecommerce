const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');

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

// GET /api/cart - Get user's cart
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('cart.productId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/cart/add - Add item to cart
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if item already in cart
    const existingItem = user.cart.find(item => item.productId.toString() === productId);
    
    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
    } else {
      // Add new item
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.json({ message: 'Item added to cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/cart/remove/:productId - Remove item from cart
router.delete('/remove/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove item from cart
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();

    res.json({ message: 'Item removed from cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/cart/clear - Clear entire cart
router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = [];
    await user.save();

    res.json({ message: 'Cart cleared', cart: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;