const { Posts } = require('../../models');

const deleteById = async (req, res) => {
  try {
    await Posts.deleteOne({_id: req.query.id});
    return res.status(200).send({ message: 'Post successfully deleted!' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = deleteById;