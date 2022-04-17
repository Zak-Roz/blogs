const { User } = require('../../models');

const updateFullname = async (req, res) => {
  try{
    const user = await User.findOne({
      login: req.body.login
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    user.fullname = req.body.fullname;
    await user.save();
    return res.status(200).send({ message: 'Fullname changed successfully!' });
  } catch(err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = updateFullname;