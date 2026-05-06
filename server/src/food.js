const express = require('express');
const router = express.Router();

const Food = require('./../models/food');
const { verifyToken } = require('../utils/authentification');

router.get('/', verifyToken, async (req, res) => {
  try {
    const food = await Food.find().select('_id, name');
    res.json(food);
  } catch (error) {
    res.status(403).send(error);
  }
});
router.get('/id', verifyToken, async (req, res) => {
  const { id } = req.query;
  try {
    const food = await Food.findOne({_id: id.toString()}).populate('craft.element', 'name');
    res.json(food);
  } catch (error) {
    res.status(403).send(error);
  }
});

module.exports = router;