const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const { TokenExpiredError } = jwt;
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: 'Unauthorized! Access Token was expired!' });
  }
  return res.status(401).send({ message: 'Unauthorized!' });
};

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send({ message: 'Token not found!' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return catchError(err, res);
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};


const authJwt = {
  verifyToken,
};
module.exports = authJwt;
