const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const Ably = require('ably');

const Player = require('./../models/player');
const checkConnection = require('../utils/authentification');
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
  
        // const token = jwt.sign(payload, process.env.JWT_SECRET);
        // res.cookie('token', token, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: 'none'
        //   // expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        //   // domain: process.env.CLIENT_PATH
        // }).send(payload);
        res.send(payload);
      } else {
        res.status(404).send('wrong password');
      }
    });
  } else {
    res.status(404).send('wrong user');
  }
});

router.get('/setCookie', async (req, res) => {
  console.log('cookie added', payload);
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.cookie('token', token, {
    secure: true,
    samesite: 'None'
  }).send(payload);
});

router.get('/verify', async (req, res) => {
  try {
    console.log(req.cookies);
    console.log('verifying');
    await checkConnection(req);
    console.log('verified');
    res.json('Connected');
  } catch (error) {
    res.status(403).send(error);
  }
});

module.exports = router;