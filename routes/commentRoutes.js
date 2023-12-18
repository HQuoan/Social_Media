const express = require('express');
const commentController = require('../controllers/commentController');

const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/me')
  .get(commentController.getMyComments)
  .post(
    authController.restrictTo('user'),
    commentController.setPostUserIds,
    authController.setCurrentId,
    commentController.createComment,
  );

router
  .route('/me/:id')
  .get(commentController.isYour, commentController.getComment)
  .patch(commentController.isYour, commentController.updateComment)
  .delete(commentController.isYour, commentController.deleteComment);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(commentController.getAllComments)
  .post(commentController.setPostUserIds, commentController.createComment);

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
