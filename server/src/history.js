const express = require('express');
const router = express.Router();

const History = require('./../models/history');
const { verifyToken } = require('../utils/authentification');

router.get('/', verifyToken, async (req, res) => {
  try {
    console.log(1)
    const histories = await History.find();
    console.log(2, histories)
    res.json(histories);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const { history } = req.body;
    const result = await updateHistory(text, player);
    res.json(history);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/', verifyToken, async (req, res) => {
  try {
    const histories = await History.find().select();
    res.json(histories);
  } catch (error) {
    res.status(500).send(error);
  }
});
// router.get('/id', verifyToken, async (req, res) => {
//   const { id } = req.query;
//   try {
//     const food = await Food.findOne({_id: id.toString()}).populate('craft.element', 'name');
//     res.json(food);
//   } catch (error) {
//     res.status(403).send(error);
//   }
// });

module.exports = router;