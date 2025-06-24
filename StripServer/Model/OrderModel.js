// models/Order.js
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  products: [
    {
      name: String,
      price: Number,
      qnty: Number,
      defaultImage: String,
    },
  ],
  amount: Number,
  status: {
    type: String,
    default: "Success", // "pending", "paid", "failed"
  },
  stripeSessionId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);