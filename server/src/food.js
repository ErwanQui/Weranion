const express = require('express');
const router = express.Router();

const Food = require('./../models/food');
const checkConnection = require('../utils/authentification');

router.get('/', async (req, res) => {
  try {
    await checkConnection(req);
    const food = await Food.find().populate('craft.element');
    res.json(food);
  } catch (error) {
    res.status(403).send(error);
  }
});

module.exports = router;