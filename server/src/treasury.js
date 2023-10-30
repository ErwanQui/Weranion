const express = require('express');
const router = express.Router();

const { verifyToken } = require('../utils/authentification');
const { getTreasurySheet, updateTransaction } = require('../services/treasury.service');

router.get('/', verifyToken, async (req, res) => {
  try {
    const { year, month } = req.query;
    const treasurySheet = await getTreasurySheet(year, month);
    res.json(treasurySheet);
  } catch (error) {
    res.status(403).send(error);
  }
});
// router.get('/id', async (req, res) => {
//   const { id } = req.query;
//   try {
//     await checkConnection(req);
//     const food = await Food.findOne({_id: id.toString()}).populate('craft.element', 'name');
//     res.json(food);
//   } catch (error) {
//     res.status(403).send(error);
//   }
// });

router.post('/updateTransaction', verifyToken, async (req, res) => {
  const { id, value } = req.body;
  const updatedTransaction = await updateTransaction(id, value);
  res.json(updatedTransaction);
});

module.exports = router;