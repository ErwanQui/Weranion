const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Player = require('./../models/player');
const checkConnection = require('../utils/authentification');

router.post('/connect', async (req, res) => {
  const { username, password } = req.body;
  const player = await Player.findOne({username: username.toString()}).populate('pnj');
  if (player) {
    bcrypt.compare(password, player.password, (err, result) => {
      if (result) {
        let payload = {};
        if(player.mj) {
          payload = {
            mj: true,
          };
        } else {
          payload = {
            firstname: player.pnj.firstname,
            lastname: player.pnj.lastname,
            mj: false,
          };
        }
  
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.cookie('token', token, {}).send(payload);
      } else {
        res.status(404).send('wrong password');
      }
    });
  } else {
    res.status(404).send('wrong user');
  }
});

router.get('/verify', async (req, res) => {
  try {
    await checkConnection(req);
    res.json('Connected');
  } catch (error) {
    res.status(403).send(error);
  }
});

module.exports = router;