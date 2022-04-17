const { authJwt } = require('../middleware');
const controller = require('../controllers/user');
const userRouter = require('express').Router();

userRouter
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  })
  .put('/updatePass', [authJwt.verifyToken], controller.updatePass)
  .put('/forgotPass', controller.forgotPass)
  .put('/updateFullname', controller.updateFullname);

module.exports = userRouter;