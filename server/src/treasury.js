const express = require('express');
const router = express.Router();

const { verifyToken } = require('../utils/authentification');
const { getTreasurySheet, updateTransaction, getTreasurySheetsList } = require('../services/treasury.service');

router.get('/', verifyToken, async (req, res) => {
  try {
    const { year, month } = req.query;
    const treasurySheet = await getTreasurySheet(year, month);
    res.json(treasurySheet);
  } catch (error) {
    console.log(error);
    res.status(403).send(error);
  }
});

router.get('/sheetsList', verifyToken, async (req, res) => {
  try {
    const treasurySheet = await getTreasurySheetsList();
    res.json(treasurySheet);
  } catch (error) {
    res.status(403).send(error);
  }
});

router.post('/updateTransaction', verifyToken, async (req, res) => {
  const { id, value } = req.body;
  const updatedTransaction = await updateTransaction(id, value);
  res.json(updatedTransaction);
});

// router.post('/createNextSheet', verifyToken, async (req, res) => {
//   const { year, month } = req.body;
//   const newSheetId = await createNextSheet(year, month);
//   const newSheet = await getTreasurySheetById(newSheetId);
//   res.json(newSheet);
// });

module.exports = router;