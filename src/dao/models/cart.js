const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  timestamp: Date,
  products: [{
    id: String,
    title: String,
    price: Number,
    thumbnail: String,
    qty: Number
  }]
});

module.exports = mongoose.model('Cart', cartSchema);