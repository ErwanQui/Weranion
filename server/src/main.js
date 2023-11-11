const express = require('express');
const router = express.Router();

const { verifyToken, newToken } = require('../utils/authentification');
const { updateTreasury } = require('../services/treasury.service');
const { updateDate, getDate } = require('../services/main.service');

router.post('/nextDate', verifyToken, async (req, res) => {
  try {
    const { year, month } = req.body;
    const date = await updateDate(year, month);
    await updateTreasury(year, month);
    const token = await newToken(req.user);
    console.log('current updated Date token', token);
    res.json({ date: date, token: token});
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get('/currentDate', verifyToken, async (req, res) => {
  try {
    const { year, month } = req.query;
    const date = await getDate(year, month);
    const token = await newToken(req.user);
    console.log('current Date token', token);
    res.json({ date: date, token: token});
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// router.get('/sheetsList', verifyToken, async (req, res) => {
//   try {
//     const treasurySheet = await getTreasurySheetsList();
//     res.json(treasurySheet);
//   } catch (error) {
//     res.status(403).send(error);
//   }
// });

// router.post('/updateTransaction', verifyToken, async (req, res) => {
//   const { id, value } = req.body;
//   const updatedTransaction = await updateTransaction(id, value);
//   res.json(updatedTransaction);
// });

// router.post('/createNextSheet', verifyToken, async (req, res) => {
//   const { year, month } = req.body;
//   const newSheetId = await createNextSheet(year, month);
//   const newSheet = await getTreasurySheetById(newSheetId);
//   res.json(newSheet);
// });

module.exports = router;