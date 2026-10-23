const mongoose = require('mongoose');
const z = require('zod')

const DuchySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  details: String,
  barony: { type: mongoose.Schema.Types.ObjectId, ref: 'Barony' }
});

const Duchy = mongoose.model('Duchy', DuchySchema, 'duchies');

const DuchyZodeSchema = z.object({
  name: z.string().min(1),
  details: z.string().optional(),
  baronyId: z.string().optional()
});

module.exports = { Duchy, DuchyZodeSchema };