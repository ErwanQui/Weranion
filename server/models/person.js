const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  age: Number,
  duchy: { type: mongoose.Schema.Types.ObjectId, ref: 'Duchy' },
  details: String,
  alive: Boolean
});

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;