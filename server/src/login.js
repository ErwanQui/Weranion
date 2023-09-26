const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Player = require('./../models/player');
const { addPlayer } = require('../services/activePlayers.service');

let payload = {};

router.post('/connect', async (req, res) => {
  const { username, password } = req.body;
  const player = await Player.findOne({username: username.toString()}).populate('pnj');
  if (player) {
    bcrypt.compare(password, player.password, async (err, result) => {
      if (result) {
        // let payload = {};
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

          addPlayer(player.pnj._id, player.pnj.firstname, player.pnj.lastname);
        }
  
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h'});
        res.json({ token });
      } else {
        res.status(404).send('wrong password');
      }
    });
  } else {
    res.status(404).send('wrong user');
  }
});

module.exports = router;