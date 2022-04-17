const controller = require('../controllers/auth');
const authRouter = require('express').Router();

authRouter
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  })
  .post('/signup', controller.signup)
  .post('/refreshtoken', controller.refreshToken)
  .post('/signin', controller.signin);

module.exports = authRouter;