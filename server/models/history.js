const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
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