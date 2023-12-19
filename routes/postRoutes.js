const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const commentRouter = require('../routes/commentRoutes');
const handlerImage = require('../utils/handlerImage');

const router = express.Router({ mergeParams: true });

router.use('/:postId/comments', commentRouter);

router.route('/').get(postController.getAllPosts);
router.use(authController.protect);

router
  .route('/me')
  .get(postController.getMyPosts)
  .post(
    handlerImage.upload.array('images'),
    authController.setCurrentId,
    postController.createPost,
  );

router
  .route('/me/:id')
  // .get(postController.isYour, postController.getPost)
  .patch(postController.isYour, postController.updatePost)
  .delete(postController.isYour, postController.deletePost);

router
  .route('/')
  // .get(postController.getAllPosts)
  .post(
    authController.restrictTo('admin'),
    handlerImage.upload.array('images'),
    postController.setUserIds,
    postController.createPost,
  );

router
  .route('/:id')
  .get(postController.getPost)
  .patch(authController.restrictTo('admin'), postController.updatePost)
  .delete(authController.restrictTo('admin'), postController.deletePost);

module.exports = router;
