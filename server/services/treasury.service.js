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

async function getTreasurySheetById(id) {
  return await TreasurySheet.findOne({_id: id.toString()}).populate('transactions')
    .populate('earnings.taxes').populate('earnings.common')
    .populate('earnings.other').populate('losses.other').populate('losses.wages')
    .populate('losses.maintenance').populate('losses.commercialPurchases')
    .populate('investments');
}

async function getTreasurySheetsList() {
  const projection = { 'year': 1, 'month': 1 };
  return await TreasurySheet.find({}, projection).sort({ year: -1, month: -1 });
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

async function createTransactionObject(name, value, details = '') {
  try {
    return await CrownTransaction.create({
      name: name,
      value: value,
      details: details
    });

  } catch (error) {
    console.error('Erreur lors de la création de la transaction :', error);
    throw error;
  }
}

async function createNextSheet(year, month) {

  const newSheet = await new TreasurySheet ({
    year: year + Math.floor(month/12),
    month: (month%12) + 1,
    ended: false,
    beginCrown: 5423,
    // beginCrown: await TreasurySheet.findOne({year: year.toString(), month: month.toString()}).endCrown,
    endCrown: null,
    transactions: [],
    earnings: {
      taxes: [],
      common: [],
      other: []
    },
    losses: {
      other: [] 
    },
    investments: []
  });

  let crownDifference = 0;

  await createTransactionObject('Thunes esklépios', 325).then((result) => {
    newSheet.earnings.taxes.push(result._id);
    crownDifference += result.value;
  });
  await createTransactionObject('Impôts', 3895).then((result) => {
    newSheet.earnings.taxes.push(result._id);
    crownDifference += result.value;
  });
  await createTransactionObject('Gains commerce', 8892).then((result) => {
    newSheet.earnings.common.push(result._id);
    crownDifference += result.value;
  });
  await createTransactionObject('Taverne Wertra', 365).then((result) => {
    newSheet.earnings.common.push(result._id);
    crownDifference += result.value;
  });
  await createTransactionObject('Salaires', -542).then((result) => {
    newSheet.losses.wages = result._id;
    crownDifference += result.value;
  });
  await createTransactionObject('Entretien Infrastructures', -689).then((result) => {
    newSheet.losses.maintenance = result._id;
    crownDifference += result.value;
  });
  await createTransactionObject('Achats commerciaux', -92).then((result) => {
    newSheet.losses.commercialPurchases = result._id;
    crownDifference += result.value;
  });
  await createTransactionObject('Impôts Sahr', -124).then((result) => {
    newSheet.losses.other.push(result._id);
    crownDifference += result.value;
  });
  console.log(newSheet.beginCrown);
  console.log(crownDifference);
  newSheet.endCrown = newSheet.beginCrown + crownDifference;

  await TreasurySheet.create(newSheet);
}

async function updateTreasury(year, month) {
  
  await createNextSheet(year, month);
  const channel = ably.channels.get('treasury');
  channel.publish('treasurySheet', {});
  channel.publish('newTreasurySheet', {});
}

module.exports = { getTreasurySheet, getTreasurySheetById, getTreasurySheetsList, updateTransaction, createNextSheet, updateTreasury };  