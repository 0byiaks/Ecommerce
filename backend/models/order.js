const mongoose = require('mongoose');

// Ensure mongoose is connected
if (mongoose.connection.readyState === 0) {
  console.log('⚠️  Mongoose not connected when loading Order model');
}

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethod: {
    type: String,
    default: 'credit_card'
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const OrderModel = mongoose.model('Order', orderSchema);
console.log('📦 Order model created:', typeof OrderModel, OrderModel.name);
module.exports = OrderModel;