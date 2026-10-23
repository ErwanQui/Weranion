const mongoose = require('mongoose');
const z = require('zod')

const PersonSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: String,
  age: Number,
  duchy: { type: mongoose.Schema.Types.ObjectId, ref: 'Duchy' },
  details: String,
  alive: Boolean
});

const Person = mongoose.model('Person', PersonSchema);

const PersonZodeCreationSchema = z.object({
  name: z.string().min(1),
  age: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().int().nonnegative()
    ),
  duchy: z.string(),
  details: z.string().optional(),
  alive: z.boolean()
});

const PersonZodeSchema = PersonZodeCreationSchema.extend({
  _id: z.string()
});

module.exports = { Person, PersonZodeSchema, PersonZodeCreationSchema };