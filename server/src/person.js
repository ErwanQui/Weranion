const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/authentification');
const mongoose = require('mongoose');

const Person = require('../models/person');

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