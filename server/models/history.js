const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  year: Number,
  month: Number,
  title: String,
  details: String,
  events: [{
    title: String,
    details: String,
  }]
});

const History = mongoose.model('History', HistorySchema);

module.exports = History;