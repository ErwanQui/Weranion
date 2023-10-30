const TreasurySheet = require('../models/treasurySheet');
const CrownTransaction = require('../models/crownTransaction');
const Ably = require('ably');

const ably = new Ably.Rest({
  key: process.env.ABLY_API_KEY,
});

async function getTreasurySheet(year, month) {
  return await TreasurySheet.findOne({year: year.toString(), month: month.toString()}).populate('transactions')
    .populate('earnings.taxes').populate('earnings.common')
    .populate('earnings.other').populate('losses.other').populate('losses.wages')
    .populate('losses.maintenance').populate('losses.commercialPurchases')
    .populate('investments');
}

async function updateTransaction(id, value) {
  const updatedTransaction = await CrownTransaction.findOneAndUpdate(
    { _id: id },
    { $set: { value: value } }
  );
  const channel = ably.channels.get('treasury');
  channel.publish('treasurySheet', {});
  return updatedTransaction;
}

module.exports = { getTreasurySheet, updateTransaction };  