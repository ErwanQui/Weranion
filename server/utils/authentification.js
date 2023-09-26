
const jwt = require('jsonwebtoken');

// async function checkConnection(req) {
//   return new Promise((resolve, reject) => {
//     const token = req.cookies.token;
//     // resolve(true);
//     if (token) {
//       jwt.verify(token, process.env.JWT_SECRET, (err) => {
//         if (err) {
//           reject('Not connected');
//         } else {
//           resolve(true);
//         }
//       });
//     } else {
//       reject('Not connected');
//     }
//   });
// }

function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  console.log(token);
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