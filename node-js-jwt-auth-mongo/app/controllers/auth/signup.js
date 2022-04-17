const genPass = require('generate-password');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../notification');
const { User } = require('../../models');

const signup = async (req, res) => {
  try {
    const password = genPass.generate({
      length: 20,
      numbers: true,
      symbols: '!#@*&^'
    });
    console.log('🚀 ~ file: auth.controller.js ~ line 20 ~ password', req.body.password || password);
    const user = await new User({
      fullname: req.body.fullname,
      login: req.body.login,
      code: bcrypt.hashSync(req.body.code, 5),
      createdAt: new Date(),
      password: bcrypt.hashSync(req.body.password || password, 8),
      status_u: 1,
    }).save();
    const email = sendEmail({
      email: user.login,
      subject: 'Registration on the BLOG website',
      text: `Hi, ${user.fullname}!\n\nYou have successfully registered!\nYour login: ${user.login}\nPassword: ${req.body.password}\nCode: ${req.body.code}\nHave a nice day!`
    });
    return res.status(200).send({ message: `You have successfully registered!${email.status === 200 ? ` Check your mail ${user.login} !` : '' }` });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = signup;