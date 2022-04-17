const bcrypt = require('bcryptjs');
const { User } = require('../../models');

const updatePass = async (req, res) => {
  try{
    const user = await User.findOne({
      login: req.body.login
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const passwordDublicate = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (passwordDublicate) {
      return res.status(401).send({ message: 'The new password is currently in use!' });
    }
    let passwordIsValid = bcrypt.compareSync(
      req.body.oldPassword,
      user.password,
    );

    if (!passwordIsValid) {
      passwordIsValid = bcrypt.compareSync(
        req.body.oldPassword,
        user.code,
      );
      if (!passwordIsValid) {
        return res.status(401).send({ message: 'The password is incorrect' });
      }
    }
    const password = bcrypt.hashSync(req.body.password, 8);
    user.password = password;
    await user.save();
    return res.status(200).send({ message: 'Password changed successfully!' });
  } catch(err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = updatePass;