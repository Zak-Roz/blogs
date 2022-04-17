const { Posts } = require('../../models');

const getById = async (req, res) => {
  try {
    const post = await Posts.findById(req.query.id);
    if (!post) {
      return res.json({ status: 204, message: 'No post found!' });
    }
    return res.json(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = getById;