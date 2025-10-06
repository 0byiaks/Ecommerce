const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
    
    console.log('🔄 Attempting to connect to MongoDB...');
    console.log(`📍 Connection string: ${mongoURI.replace(/\/\/.*@/, '//***:***@')}`); // Hide credentials in logs
    
    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

    return conn;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('💡 To fix this issue:');
    console.log('   1. Install MongoDB: brew install mongodb-community');
    console.log('   2. Start MongoDB: brew services start mongodb-community');
    console.log('   3. Or use MongoDB Atlas (cloud): Update MONGO_URI in .env');
    console.log('   4. Or run without database for now (server will still work)');
    
    // Don't exit process - allow server to run without database
    console.log('⚠️  Continuing without database connection...');
    return null;
  }
};

module.exports = connectDB;
