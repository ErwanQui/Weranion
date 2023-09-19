const express = require('express');
const router = express.Router();

const checkConnection = require('../utils/authentification');
const { getActivePlayers } = require('../services/activePlayers.service');


router.get('/list', async (req, res) => {  
  try {
    await checkConnection(req);
    const activePlayers = getActivePlayers();
    res.json(activePlayers);
  } catch (error) {
    res.status(403).send(error);
  }
});

module.exports = router;