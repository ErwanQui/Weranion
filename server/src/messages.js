const express = require('express');
const router = express.Router();

const { verifyToken } = require('../utils/authentification');
const { getMessages, newMessage } = require('../services/messages.service');

router.get('/', verifyToken, async (req, res) => {
  try {
    const messages = await getMessages();
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post('/newMessage', verifyToken, async (req, res) => {
  try {
    const { text, player } = req.body;
    const result = await newMessage(text, player);
    console.log('je suis là', result);
    res.json({});
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;