const Message = require('../models/message');
// const Ably = require('ably');

// const ably = new Ably.Rest({
//   key: process.env.ABLY_API_KEY,
// });

async function getMessages() {
  try {
    const projection = { 'text': 1, 'player': 1 };
    return await Message.find({}, projection).sort({ date: 1 }).populate('player');
  } catch(error) {
    return (error);
  }
}

async function newMessage(text, player) {
  try {
    const newMessage = {
      text: text,
      player: player,
      date: Date.now()
    };
    console.log('ici', newMessage);
    await Message.create(newMessage);
    return true;
  } catch(error) {
    return (error);
  }
}

module.exports = { getMessages, newMessage };  