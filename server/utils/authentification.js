const jwt = require('jsonwebtoken');
const Data = require('./../models/data');

function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé' });
  }

  // Vérifiez et décodez le jeton
  jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Accès non autorisé' });
    }
    req.user = decodedToken;
    next();
  });
}

async function isOutdatedToken(token) {
  const data = await Data.findOne({});
  if (token.data.year === data.currentYear && token.data.month === data.currentMonth) {
    return '';
  }
  let payload = {};
  if(token.player.mj) {
    payload = {
      mj: true,
    };
  } else {
    payload = {
      player: token.player,
      data: {
        currentCrown: data.currentCrown,
        year: data.currentYear,
        month: data.currentMonth
      }
    };
  }
    
  const newToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h'});
  return(newToken);
}

async function newToken(token) {
  const data = await Data.findOne({});
  let payload = {};
  if(token.player.mj) {
    payload = {
      mj: true,
    };
  } else {
    payload = {
      player: token.player,
      data: {
        currentCrown: data.currentCrown,
        year: data.currentYear,
        month: data.currentMonth
      }
    };
  }
    
  const newToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h'});
  return(newToken);
}

module.exports = { verifyToken, isOutdatedToken, newToken };