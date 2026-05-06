const mongoose = require('mongoose');
const Person = require('./person');

const PlayerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  pnj: { type: mongoose.Schema.Types.ObjectId, ref: Person } || null,
  mj: Boolean
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;