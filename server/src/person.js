const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/authentification');
const mongoose = require('mongoose');
const z = require('zod')

const { Person, PersonZodeSchema, PersonZodeCreationSchema } = require('../models/person');
const { Duchy } = require('../models/duchy');

router.get('/', verifyToken, async (req, res) => {
  try {
    const { _id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ message: 'Personne non trouvée' });
    }

    const person = await Person.findById(_id)
      .populate('duchy')
      .lean();
    res.json(person);

  } catch (error) {
    console.error('erreur get :', error);
    res.status(500).send(error);
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
  const person = PersonZodeCreationSchema.safeParse(req.body)?.data;
  console.log(person)

  if (!person || !person.name || isNaN(person.age) || !person.duchy || typeof person.alive !== 'boolean') {
    return res.status(400).json({ message: 'Certains champs n\'ont pas été renseignés' });
  }

  const existingPerson = !!(await Person.exists({ name: person.name }));
  console.log('existingPerson', existingPerson)
  if (existingPerson) {
    return res.status(409).json({ message: 'Un individu possédant ce nom existe déjà' });
  }

  if (!(await Duchy.findById(person.duchy))) {
        return res.status(404).json({ message: `Le duché n'existe pas` });
  }

  const newPersonId = (await Person.create({
    name: person.name,
    age: person.age,
    alive: person.alive,
    duchy: person.duchy,
    description: person.details
  }))._id

  console.log('newPersonId', newPersonId)

  res.status(200).send(newPersonId)

  } catch (error) {
    console.error('erreur get :', error);
    res.status(500).send(error);
  }
});

router.put('/', verifyToken, async (req, res) => {
  try {
  const person = PersonZodeSchema.safeParse(req.body).data;
  console.log(person)

  if (!mongoose.Types.ObjectId.isValid(person._id)) {
    return res.status(404).json({ message: 'Personne non trouvée' });
  }

  if (!person || !person.name || isNaN(person.age) || !person.duchy || typeof person.alive !== 'boolean') {
    return res.status(400).json({ message: 'Certains champs n\'ont pas été renseignés' });
  }

  const updatedPerson = await Person.findOneAndUpdate(
    { _id: person._id },
    { $set: person },
    { new: true, upsert: true }
  )

  res.status(200).send(updatedPerson);

  } catch (error) {
    console.error('erreur get :', error);
    res.status(500).send(error);
  }
});

router.get('/people', verifyToken, async (req, res) => {
  try {
    const { name, duchyId, alive } = req.query;
    
    const filters = {};
    if (name) {
      filters.name = {
        $regex: name,
        $options: 'i'
      };
    }
    if (mongoose.Types.ObjectId.isValid(duchyId)) {
      filters.duchy = duchyId;
    }
    if (alive && alive !== 'false') {
      filters.alive = alive;
    }

    console.log(filters)

    const people = await Person.find(filters)
      .populate('duchy').lean();
    res.json(people);
  } catch (error) {
    console.error('erreur update :', error);
    res.status(500).send(error);
  }
});

module.exports = router;