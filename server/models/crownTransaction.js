const mongoose = require('mongoose');

const CrownTransactionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  value: Number,
  details: String
});

const CrownTransaction = mongoose.model('CrownTransaction', CrownTransactionSchema);

module.exports = CrownTransaction;