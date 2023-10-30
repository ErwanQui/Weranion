const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: String,
  lastname: String
});

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;