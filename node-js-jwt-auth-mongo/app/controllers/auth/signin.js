const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, RefreshToken } = require('../../models');
const config = require('../../config/auth.config');

const signin = async (req, res) => {
  try{
    const user = await User.findOne({
      login: req.body.login
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid password!'
      });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    const refreshToken = await RefreshToken.createToken(user);
    if(user.status_u === 1) {
      user.status_u = 2;
      await user.save();
    }
    if(user.status_id === 3) {
      return res.status(403).send({
        id: user._id,
        fullname: user.fullname,
        login: user.login,
        message: 'You have been blocked! Contact support!',
      });
    }
    return res.status(200).send({
      id: user._id,
      fullname: user.fullname,
      login: user.login,
      accessToken: token,
      refreshToken,
    });
  }catch(err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = signin;