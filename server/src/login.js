const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Player = require('./../models/player');

router.post('/connect', async (req, res) => {
  const { username, password } = req.body;
  const player = await Player.findOne({username: username});
  if (player) {
    bcrypt.compare(password, player.password, (err, result) => {
      if (result) {
        const payload = {
          username: username
        };
  
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.cookie('token', token, {
          httpOnly: true
        }).send(player);
      } else {
        res.status(404).send('wrong password');
      }
    });
  } else {
    res.status(404).send('wrong user');
  }
});

router.get('/verify', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        res.status(403).send('Not connected');
      } else {
        res.json('c est ok');
      }
    });
  } else {
    res.status(403).send('Not connected');
  }
});

module.exports = router;