const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  cart: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    }
  }],
  orders: [{
    _id: String,
    items: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      name: String,
      price: Number,
      quantity: Number
    }],
    total: Number,
    status: {
      type: String,
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);
