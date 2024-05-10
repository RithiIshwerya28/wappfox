const jwt = require('jsonwebtoken');

const getJWTToken = function (userId) {
  const expiresInMinutes = process.env.JWT_EXPIRE;
  const expirationTimeInSeconds = expiresInMinutes * 60;

  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: expirationTimeInSeconds });

  return token
}

module.exports = {
  getJWTToken
}