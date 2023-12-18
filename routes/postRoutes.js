const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const handlerImage = require('../utils/handlerImage');

const router = express.Router({ mergeParams: true });

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
  .get(postController.isYour, postController.getPost)
  .patch(postController.isYour, postController.updatePost)
  .delete(postController.isYour, postController.deletePost);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  // .get(postController.getAllPosts)
  .post(
    handlerImage.upload.array('images'),
    postController.setUserIds,
    postController.createPost,
  );

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
