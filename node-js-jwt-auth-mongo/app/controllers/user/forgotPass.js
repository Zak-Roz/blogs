const bcrypt = require('bcryptjs');
const { User } = require('../../models');

const forgotPass = async (req, res) => {
  try{
    console.log('🚀 ~ file: forgotPass.js ~ line 6 ~ forgotPass ~ req.body', req.body);
    const user = await User.findOne({
      login: req.body.login
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    
    const codeIsValid = await bcrypt.compare(
      req.body.code,
      user.code,
    );

    if (!codeIsValid) {
      return res.status(401).send({ message: 'The code is incorrect' });
    }

    const passwordDublicate = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (passwordDublicate) {
      return res.status(401).send({ message: 'The new password is currently in use!' });
    }
    const password = bcrypt.hashSync(req.body.password, 8);
    user.password = password;
    await user.save();
    return res.status(200).send({ message: 'Password changed successfully!' });
  }catch(err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = forgotPass;