const { authJwt } = require('../middleware');
const controller = require('../controllers/posts');
const postsRouter = require('express').Router();
const upload = require('../controllers/posts/multer');

postsRouter
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  })
  .get('/getAll', [authJwt.verifyToken], controller.getAll)
  .get('/getById', [authJwt.verifyToken], controller.getById)
  .delete('/deleteById', [authJwt.verifyToken], controller.deleteById)
  .post('/new', [authJwt.verifyToken], upload.array('files', 100), controller.create)
  .put('/update', [authJwt.verifyToken], upload.array('files', 100), controller.update);

module.exports = postsRouter;