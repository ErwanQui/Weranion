const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/connect', (req, res) => {
  const { username, password } = req.body;

  if (username === 'a' && password === 'a') {

    const payload = {
      username: username
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie('token', token, {
      httpOnly: true
    }).send('Cookie shipped');
  } else {
    res.json({ message: username, try: 'true' });
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