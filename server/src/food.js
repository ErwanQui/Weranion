const express = require('express');
const router = express.Router();

const Food = require('./../models/food');
const checkConnection = require('../utils/authentification');

router.get('/', async (req, res) => {
  try {
    await checkConnection(req);
    const food = await Food.find();
    res.json(food);
  } catch (error) {
    res.status(403).send(error);
  }
});
router.get('/id', async (req, res) => {
  const { id } = req.query;
  try {
    await checkConnection(req);
    const food = await Food.findOne({_id: id}).populate('craft.element');
    res.json(food);
  } catch (error) {
    res.status(403).send(error);
  }
});

module.exports = router;