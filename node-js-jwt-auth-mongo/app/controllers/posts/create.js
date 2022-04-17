const sharp = require('sharp');
const process = require('process');
const { Posts } = require('../../models');

const create = (req, res) => {
  try {
    const url = req.protocol + '://' + req.get('host');
    let imgInput = [];
    let imgOutput = [];
    let img = [];
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
    const post = new Posts({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      username: req.body.username,
      createdAt: new Date(),
      images: img,
    });
    post.save();
    return res.status(200).send({ message: 'Post successfully created!' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = create;