const express = require('express');
const commentController = require('../controllers/commentController');

const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.route('/parent').get(commentController.getParentComments);
router
  .route('/me')
  .get(commentController.getMyComments)
  .post(
    commentController.setPostUserIds,
    authController.setCurrentId,
    commentController.createComment,
  );

router
  .route('/me/:id')
  .patch(commentController.isYour, commentController.updateComment)
  .delete(commentController.isYour, commentController.deleteComment);

router
  .route('/')
  .get(commentController.getAllComments)
  .post(
    authController.restrictTo('admin'),
    commentController.setPostUserIds,
    commentController.createComment,
  );

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(authController.restrictTo('admin'), commentController.updateComment)
  .delete(authController.restrictTo('admin'), commentController.deleteComment);

router.route('/:id/reply').get(commentController.getCommentReply);

module.exports = router;
