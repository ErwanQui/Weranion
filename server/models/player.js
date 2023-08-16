const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  username: String,
  password: String
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;