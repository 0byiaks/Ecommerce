require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 99.99,
    category: "Electronics",
    stock: 50
  },
  {
    name: "Smart Watch",
    description: "Fitness tracking smartwatch with heart rate monitor",
    price: 199.99,
    category: "Electronics", 
    stock: 25
  },
  {
    name: "Coffee Maker",
    description: "Automatic drip coffee maker with programmable timer",
    price: 79.99,
    category: "Kitchen",
    stock: 30
  },
  {
    name: "Running Shoes",
    description: "Comfortable running shoes with breathable mesh",
    price: 129.99,
    category: "Sports",
    stock: 40
  },
  {
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for better ergonomics",
    price: 49.99,
    category: "Office",
    stock: 60
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');
    
    // Add sample products
    await Product.insertMany(sampleProducts);
    console.log('✅ Added sample products');
    
    // Show what was added
    const products = await Product.find({});
    console.log(`📦 Total products: ${products.length}`);
    products.forEach(p => {
      console.log(`   - ${p.name}: $${p.price}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
