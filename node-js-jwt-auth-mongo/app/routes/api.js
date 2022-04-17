const router = require('express').Router();

const authRouter = require('./auth');
router.use('/auth', authRouter);

const userRouter = require('./user');
router.use('/user', userRouter);

const postsRouter = require('./posts');
router.use('/posts', postsRouter);

module.exports = router;