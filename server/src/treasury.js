const express = require('express');
const router = express.Router();

const checkConnection = require('../utils/authentification');
const TreasurySheet = require('../models/treasurySheet');

router.get('/', async (req, res) => {
  try {
    await checkConnection(req);
    const treasurySheet = await TreasurySheet.findOne().populate('transactions')
      .populate('earnings.taxes').populate('earnings.common')
      .populate('earnings.other').populate('losses.other').populate('losses.wages')
      .populate('losses.maintenance').populate('losses.commercialPurchases')
      .populate('investments');res.json(treasurySheet);
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

module.exports = router;