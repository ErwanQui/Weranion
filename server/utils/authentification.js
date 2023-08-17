
const jwt = require('jsonwebtoken');

async function checkConnection(req) {
  return new Promise((resolve, reject) => {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
          reject('Not connected');
        } else {
          resolve(true);
        }
      });
    } else {
      reject('Not connected');
    }
  });
}

module.exports = checkConnection;