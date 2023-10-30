const mongoose = require('mongoose');
const City = require('./city');
const Food = require('./food');

const FoodProductionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  food: { type: mongoose.Schema.Types.ObjectId, ref: Food },
  stock: Number,
  city: { type: mongoose.Schema.Types.ObjectId, ref: City }
});

const FoodProduction = mongoose.model('FoodProduction', FoodProductionSchema);

module.exports = FoodProduction;