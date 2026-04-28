const express = require('express');
const router = express.Router();

const History = require('./../models/history');
const { verifyToken } = require('../utils/authentification');
const { updateHistory } = require('./../services/history.service');

router.get('/', verifyToken, async (req, res) => {
  try {
    const histories = await History.find();
    res.json(histories);
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.post('/', verifyToken, async (req, res) => {
//   try {
//     const { history } = req.body;
//     console.log('history', history);
//     const result = await updateHistory(history);
//     res.json(history);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.put('/', verifyToken, async (req, res) => {
  try {
    const { history } = req.body;
    const result = await updateHistory(history);
    res.json(result);
  } catch (error) {
    console.error('erreur update :', error);
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