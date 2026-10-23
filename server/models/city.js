const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  details: String,
  duchy: { type: mongoose.Schema.Types.ObjectId, ref: 'Duchy' }
});

const City = mongoose.model('City', CitySchema, 'cities');

module.exports = City;