const mongoose = require('mongoose');

const BaronySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  details: String
});

const Barony = mongoose.model('Barony', BaronySchema, 'baronies');

module.exports = Barony;