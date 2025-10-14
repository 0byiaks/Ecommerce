require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Use production MongoDB URI
const MONGODB_URI = 'mongodb+srv://austinbale667_db_user:VRDEyu1sMmKdgCju@crud.uqdznk1.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=CRUD';

const sampleProducts = [
  // Electronics
  {
    name: "iPhone 15 Pro",
    description: "Latest iPhone with titanium design and A17 Pro chip",
    price: 999.99,
    originalPrice: 1099.99,
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Apple",
    stock: 25,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Samsung Galaxy S24",
    description: "Premium Android smartphone with AI features",
    price: 899.99,
    originalPrice: 999.99,
    category: "Electronics",
    subcategory: "Smartphones", 
    brand: "Samsung",
    stock: 30,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "MacBook Pro 16-inch",
    description: "Powerful laptop with M3 Pro chip and Liquid Retina XDR display",
    price: 2499.99,
    originalPrice: 2699.99,
    category: "Electronics",
    subcategory: "Laptops",
    brand: "Apple",
    stock: 15,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Dell XPS 13",
    description: "Ultrabook with InfinityEdge display and 11th gen Intel processor",
    price: 1199.99,
    originalPrice: 1299.99,
    category: "Electronics",
    subcategory: "Laptops",
    brand: "Dell",
    stock: 20,
    rating: 4.6,
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"],
    isActive: true
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise canceling wireless headphones",
    price: 399.99,
    originalPrice: 449.99,
    category: "Electronics",
    subcategory: "Audio",
    brand: "Sony",
    stock: 40,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "AirPods Pro 2nd Gen",
    description: "Active noise cancellation with spatial audio",
    price: 249.99,
    originalPrice: 279.99,
    category: "Electronics",
    subcategory: "Audio",
    brand: "Apple",
    stock: 50,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500"],
    isActive: true
  },
  {
    name: "iPad Air 5th Gen",
    description: "Powerful tablet with M1 chip and Liquid Retina display",
    price: 599.99,
    originalPrice: 649.99,
    category: "Electronics",
    subcategory: "Tablets",
    brand: "Apple",
    stock: 35,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500"],
    isActive: true
  },
  {
    name: "Samsung Galaxy Tab S9",
    description: "Premium Android tablet with S Pen included",
    price: 799.99,
    originalPrice: 899.99,
    category: "Electronics",
    subcategory: "Tablets",
    brand: "Samsung",
    stock: 25,
    rating: 4.6,
    images: ["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500"],
    isActive: true
  },
  {
    name: "Apple Watch Series 9",
    description: "Advanced smartwatch with health monitoring and GPS",
    price: 399.99,
    originalPrice: 449.99,
    category: "Electronics",
    subcategory: "Wearables",
    brand: "Apple",
    stock: 30,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Fitbit Versa 4",
    description: "Fitness smartwatch with built-in GPS and health metrics",
    price: 199.99,
    originalPrice: 229.99,
    category: "Electronics",
    subcategory: "Wearables",
    brand: "Fitbit",
    stock: 45,
    rating: 4.4,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"],
    isActive: true
  },

  // Home & Kitchen
  {
    name: "Dyson V15 Detect",
    description: "Cordless vacuum with laser dust detection and powerful suction",
    price: 649.99,
    originalPrice: 749.99,
    category: "Home & Kitchen",
    subcategory: "Cleaning",
    brand: "Dyson",
    stock: 20,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Instant Pot Duo 7-in-1",
    description: "Electric pressure cooker with 7 cooking functions",
    price: 99.99,
    originalPrice: 129.99,
    category: "Home & Kitchen",
    subcategory: "Kitchen Appliances",
    brand: "Instant Pot",
    stock: 40,
    rating: 4.6,
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"],
    isActive: true
  },
  {
    name: "KitchenAid Stand Mixer",
    description: "Professional stand mixer with 5-quart bowl and multiple attachments",
    price: 329.99,
    originalPrice: 379.99,
    category: "Home & Kitchen",
    subcategory: "Kitchen Appliances",
    brand: "KitchenAid",
    stock: 25,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Nespresso Vertuo Next",
    description: "Coffee machine with centrifusion technology for perfect extraction",
    price: 179.99,
    originalPrice: 199.99,
    category: "Home & Kitchen",
    subcategory: "Kitchen Appliances",
    brand: "Nespresso",
    stock: 35,
    rating: 4.5,
    images: ["https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500"],
    isActive: true
  },
  {
    name: "Philips Hue Smart Bulbs",
    description: "Set of 4 smart LED bulbs with 16 million colors",
    price: 79.99,
    originalPrice: 99.99,
    category: "Home & Kitchen",
    subcategory: "Smart Home",
    brand: "Philips",
    stock: 50,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500"],
    isActive: true
  },

  // Clothing & Fashion
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Max Air unit for cushioning",
    price: 150.99,
    originalPrice: 180.99,
    category: "Clothing & Fashion",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 60,
    rating: 4.6,
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"],
    isActive: true
  },
  {
    name: "Adidas Ultraboost 22",
    description: "Running shoes with Boost midsole for energy return",
    price: 180.99,
    originalPrice: 200.99,
    category: "Clothing & Fashion",
    subcategory: "Shoes",
    brand: "Adidas",
    stock: 45,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"],
    isActive: true
  },
  {
    name: "Levi's 501 Original Jeans",
    description: "Classic straight-fit jeans in authentic blue denim",
    price: 89.99,
    originalPrice: 109.99,
    category: "Clothing & Fashion",
    subcategory: "Jeans",
    brand: "Levi's",
    stock: 80,
    rating: 4.5,
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500"],
    isActive: true
  },
  {
    name: "Uniqlo Heattech T-Shirt",
    description: "Thermal t-shirt with moisture-wicking and heat retention",
    price: 19.99,
    originalPrice: 24.99,
    category: "Clothing & Fashion",
    subcategory: "Tops",
    brand: "Uniqlo",
    stock: 100,
    rating: 4.3,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"],
    isActive: true
  },
  {
    name: "Patagonia Fleece Jacket",
    description: "Sustainable fleece jacket made from recycled materials",
    price: 99.99,
    originalPrice: 129.99,
    category: "Clothing & Fashion",
    subcategory: "Outerwear",
    brand: "Patagonia",
    stock: 30,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"],
    isFeatured: true,
    isActive: true
  },

  // Sports & Outdoors
  {
    name: "Yoga Mat Pro",
    description: "Non-slip yoga mat with superior grip and cushioning",
    price: 49.99,
    originalPrice: 69.99,
    category: "Sports & Outdoors",
    subcategory: "Fitness",
    brand: "Lululemon",
    stock: 50,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500"],
    isActive: true
  },
  {
    name: "Hydro Flask Water Bottle",
    description: "Insulated stainless steel water bottle keeps drinks cold for 24 hours",
    price: 34.99,
    originalPrice: 44.99,
    category: "Sports & Outdoors",
    subcategory: "Hydration",
    brand: "Hydro Flask",
    stock: 75,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500"],
    isActive: true
  },
  {
    name: "Coleman 4-Person Tent",
    description: "Weather-resistant tent perfect for camping and outdoor adventures",
    price: 89.99,
    originalPrice: 119.99,
    category: "Sports & Outdoors",
    subcategory: "Camping",
    brand: "Coleman",
    stock: 25,
    rating: 4.4,
    images: ["https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=500"],
    isActive: true
  },
  {
    name: "Resistance Bands Set",
    description: "Set of 5 resistance bands for full-body workouts",
    price: 24.99,
    originalPrice: 34.99,
    category: "Sports & Outdoors",
    subcategory: "Fitness",
    brand: "Fit Simplify",
    stock: 60,
    rating: 4.5,
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"],
    isActive: true
  },
  {
    name: "Garmin Forerunner 945",
    description: "GPS running watch with advanced training metrics",
    price: 499.99,
    originalPrice: 599.99,
    category: "Sports & Outdoors",
    subcategory: "Fitness Trackers",
    brand: "Garmin",
    stock: 20,
    rating: 4.6,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"],
    isActive: true
  },

  // Books & Media
  {
    name: "Kindle Paperwhite",
    description: "Waterproof e-reader with 6.8-inch display and adjustable warm light",
    price: 139.99,
    originalPrice: 159.99,
    category: "Books & Media",
    subcategory: "E-Readers",
    brand: "Amazon",
    stock: 40,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500"],
    isActive: true
  },
  {
    name: "Atomic Habits by James Clear",
    description: "Bestselling book on building good habits and breaking bad ones",
    price: 16.99,
    originalPrice: 19.99,
    category: "Books & Media",
    subcategory: "Books",
    brand: "Penguin Random House",
    stock: 100,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Sony WH-1000XM4",
    description: "Industry-leading noise canceling wireless headphones",
    price: 349.99,
    originalPrice: 399.99,
    category: "Electronics",
    subcategory: "Audio",
    brand: "Sony",
    stock: 35,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"],
    isActive: true
  }
];

const seedProductionDatabase = async () => {
  try {
    console.log('🔄 Connecting to production database...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to production database');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');
    
    // Add sample products
    await Product.insertMany(sampleProducts);
    console.log('✅ Added sample products to production');
    
    // Show what was added
    const products = await Product.find({});
    console.log(`📦 Total products in production: ${products.length}`);
    products.forEach(p => {
      console.log(`   - ${p.name}: $${p.price}`);
    });
    
    console.log('🎉 Production database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding production database:', error);
    process.exit(1);
  }
};

seedProductionDatabase();
