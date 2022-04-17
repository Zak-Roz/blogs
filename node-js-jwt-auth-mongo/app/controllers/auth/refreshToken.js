const jwt = require('jsonwebtoken');
const config = require('../../config/auth.config');
const { RefreshToken } = require('../../models');

const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).send({ message: 'Refresh Token is required!' });
  }
  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });
    if (!refreshToken) {
      return res.status(403).send({ message: 'Refresh token is not in database!' });
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
      
      return res.status(403).send({ message: 'Refresh token was expired. Please make a new signin request'});
    }
    let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports = refreshToken;