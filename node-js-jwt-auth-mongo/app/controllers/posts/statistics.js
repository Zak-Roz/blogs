const { Posts } = require('../../models');

const statistics = async (req, res) => {
  try {
    const posts = await Posts.find().sort({ created: -1 });
    if (!posts.length) {
      return res.json({ status: 204, message: 'The post has not been created yet!' });
    }
    const data = {}; const result = [];
    posts.forEach((el) => {
      const date = `${new Date(el.createdAt).getFullYear()}-${new Date(el.createdAt).getMonth() + 1}-${new Date(el.createdAt).getDate()}`;
      if (!data[date]) data[date] = 1;
      else data[date]++;
    });
    Object.keys(data).sort().reduce(
      (obj, key) => { 
        obj[key] = data[key]; 
        result.push([key, data[key]]);
        return obj;
      }, 
      {}
    );
    return res.json(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = statistics;