const express = require('express');
const messageController = require('../controllers/messageController');

const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router
  .route('/me')
  .get(messageController.getMyMessages)
  .post(authController.setCurrentId, messageController.createMessageClient);

router
  .route('/me/:id')
  .patch(messageController.isYour, messageController.updateMessage)
  .delete(messageController.isYour, messageController.deleteMessage);

router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(messageController.getAllMessages)
  .post(messageController.createMessage);

router
  .route('/:id')
  .get(messageController.getMessage)
  .patch(messageController.updateMessage)
  .delete(messageController.deleteMessage);

module.exports = router;
