const mongoose = require('mongoose');
const z = require('zod')

const BaronySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  details: String
});

const Barony = mongoose.model('Barony', BaronySchema, 'baronies');

const BaronyZodeSchema = z.object({
  name: z.string().min(1),
  details: z.string().optional()
});

module.exports = { Barony, BaronyZodeSchema };