const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - Get all products or search products
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    // If search query is provided, search in name, description, and category
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ]
      };
    }

    // If category filter is provided
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products - Create new product (admin only)
router.post('/', async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;
    
    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      stock
    });
    
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;