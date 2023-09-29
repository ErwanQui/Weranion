const jwt = require('jsonwebtoken');

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

module.exports = { verifyToken };