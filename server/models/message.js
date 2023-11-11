const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  text: String,
  player: {
    firstname: String,
    lastname: String
  },
  date: Date
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;