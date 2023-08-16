const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name: String
});

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;