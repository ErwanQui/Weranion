const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  currentCrown: Number,
  currentYear: Number,
  currentMonth: Number
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;