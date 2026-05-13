const mongoose = require('mongoose');

const DuchySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  details: String,
  barony: { type: mongoose.Schema.Types.ObjectId, ref: 'Barony' }
});

const Duchy = mongoose.model('Duchy', DuchySchema, 'duchies');

module.exports = Duchy;