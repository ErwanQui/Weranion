const Data = require('../models/data');
// const CrownTransaction = require('../models/crownTransaction');
const Ably = require('ably');

const ably = new Ably.Rest({
  key: process.env.ABLY_API_KEY,
});

async function updateDate(year, month) {
  try {
    // // console.log(year, month);
    await Data.findOneAndUpdate(
      { currentYear: year, currentMonth: month },
      { $set: { currentYear: year + Math.floor(month/12), currentMonth: (month%12) + 1 } }
    );
    // console.log(date);
    const channel = ably.channels.get('main');
    channel.publish('newDate', {});
    return await Data.findOne({});
  } catch(error) {
    return (error);
  }
}

async function getDate() {
  try {
    return await Data.findOne({});
  } catch(error) {
    return (error);
  }
}

module.exports = { updateDate, getDate };  