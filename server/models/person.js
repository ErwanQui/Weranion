// const { Schema } = require('mongoose');

// const personSchema = new Schema({
//   name: String
// });

// module.exports = personSchema;

const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name: String
});

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;