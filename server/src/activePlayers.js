const express = require('express');
const router = express.Router();

const { verifyToken } = require('../utils/authentification');
const { getActivePlayers } = require('../services/activePlayers.service');


router.get('/list', verifyToken, async (req, res) => {
  const activePlayers = getActivePlayers();
  res.json(activePlayers);
});

module.exports = router;