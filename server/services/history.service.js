const History = require('./../models/history');

async function updateHistory(history) {
  return History.findOneAndUpdate(
    { year: history.year, month: history.month },
    { $set: { title: history.title, details: history.details, events: history.events } },
    { new: true, upsert: true }
  )
}

module.exports = { updateHistory };