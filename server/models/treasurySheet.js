const mongoose = require('mongoose');
const CrownTransaction = require('./crownTransaction');
const Investment = require('./investment');

const TreasurySheetSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  year: Number,
  month: Number,
  ended: Boolean,
  beginCrown: Number,
  endCrown: Number,
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: CrownTransaction }],
  earnings: {
    taxes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: CrownTransaction
      }
    ],
    common: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: CrownTransaction
      }
    ],
    other: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: CrownTransaction
      }
    ]
  },
  losses: {
    wages: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CrownTransaction
    },
    maintenance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CrownTransaction
    },
    commercialPurchases: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CrownTransaction
    },
    other: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: CrownTransaction
      }
    ]
  },
  investments: [{ type: mongoose.Schema.Types.ObjectId, ref: Investment }]
});

const TreasurySheet = mongoose.model('TreasurySheet', TreasurySheetSchema);

module.exports = TreasurySheet;