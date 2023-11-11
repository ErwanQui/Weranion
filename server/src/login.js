const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Player = require('./../models/player');
const Data = require('./../models/data');
const { addPlayer, updatePlayerActivity } = require('../services/activePlayers.service');
const { verifyToken, isOutdatedToken } = require('../utils/authentification');

let payload = {};

router.post('/connect', async (req, res) => {
  const { username, password } = req.body;
  const player = await Player.findOne({username: username.toString()}).populate('pnj');
  if (player) {
    bcrypt.compare(password, player.password, async (err, result) => {
      if (result) {
        const data = await Data.findOne({});
        console.log(data);
        if(player.mj) {
          payload = {
            mj: true,
          };
        } else {
          payload = {
            player: {
              id: player._id,
              firstname: player.pnj.firstname,
              lastname: player.pnj.lastname,
              mj: false
            },
            data: {
              currentCrown: data.currentCrown,
              year: data.currentYear,
              month: data.currentMonth
            }
          };

          addPlayer(player._id, player.pnj.firstname, player.pnj.lastname);
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

router.get('/verify', verifyToken, async (req, res) => {
  // const token = await updateToken(req.user);
  res.json({ id: req.user.player.id });
});

router.get('/verifyToken', verifyToken, async (req, res) => {
  const token = await isOutdatedToken(req.user);
  res.json({ token: token });
});

router.get('/ping', verifyToken, (req, res) => {
  updatePlayerActivity(req.query.id);
  res.json('ok');
});

module.exports = router;