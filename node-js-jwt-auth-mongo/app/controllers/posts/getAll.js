const { Posts } = require('../../models');

const getAll = async (req, res) => {
  try {
    const posts = await Posts.find().sort({ created: -1 });
    if (!posts.length) {
      return res.json({ status: 204, message: 'The post has not been created yet!' });
    }
    return res.json(posts);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = getAll;