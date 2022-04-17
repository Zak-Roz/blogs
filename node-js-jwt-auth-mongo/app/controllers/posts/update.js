const sharp = require('sharp');
const process = require('process');
const { Posts } = require('../../models');

const update = async (req, res) => {
  try {
    const post = await Posts.findById(req.body.id);
    if (!post) {
      return res.json({ status: 204, message: 'No post found!' });
    }
    const url = req.protocol + '://' + req.get('host');
    let imgInput = [];
    let imgOutput = [];
    let img = JSON.parse(req.body.images);
    req.file ? img.push(req.file.path) 
      : req.files ? req.files.forEach((el) => {
        img.push(url + `/data/${el.filename}`);
        imgInput.push(`\\data\\${el.filename}`);
        imgOutput.push(`\\data\\thumbnail\\${el.filename}`);
      }) 
        : null;
    imgInput = imgInput.map((el) => `${process.cwd()}${el}`);
    imgOutput = imgOutput.map((el) => `${process.cwd()}${el}`);
    for(let i = 0; i < imgInput.length; i ++) {
      sharp(imgInput[i]).resize({ height: 100, width: 100 }).toFile(imgOutput[i]).then((el) => el);
    }
    post.title = req.body.title;
    post.description = req.body.description;
    post.content = req.body.content;
    post.images = img;
    post.save();
    return res.status(200).send({ message: 'Post successfully updated!' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = update;
