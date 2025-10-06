require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');

const app = express();

// Enable CORS for frontend communication
app.use(cors());

// Middleware
app.use(express.json()); // Parse JSON bodies

// Mount auth routes
app.use('/api/auth', authRoutes);

// Mount product routes
app.use('/api/products', productRoutes);

// Mount cart routes
app.use('/api/cart', cartRoutes);

// Mount order routes
app.use('/api/orders', orderRoutes);

// Routes
app.get('/', (req, res) => res.send('Backend working'));

// Health check endpoint
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({
    status: 'OK',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Get all users endpoint (for debugging)
app.get('/api/users', async (req, res) => {
  try {
    const User = require('./models/User');
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    res.json({
      count: users.length,
      users: users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8000;

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/health`);
      console.log(`🔐 Auth endpoints:`);
      console.log(`   POST http://localhost:${PORT}/api/auth/register`);
      console.log(`   POST http://localhost:${PORT}/api/auth/login`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    console.log('🔄 Retrying in 5 seconds...');
    setTimeout(startServer, 5000);
  }
};

startServer();

