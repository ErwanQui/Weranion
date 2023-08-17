const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  craft: [{ 
    element: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    quantity: Number
  }]
});

const Food = mongoose.model('Food', FoodSchema);

module.exports = Food;