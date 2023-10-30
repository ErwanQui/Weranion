const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  beginMonth: Number,
  beginYear: Number,
  duration: Number,
  cost: Number,
  ended: Boolean
});

const Investment = mongoose.model('Investment', InvestmentSchema);

module.exports = Investment;