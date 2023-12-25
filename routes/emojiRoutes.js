const express = require('express');
const emojiController = require('../controllers/emojiController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/me')
  .post(authController.setCurrentId, emojiController.createEmojiClient);

router
  .route('/')
  .get(emojiController.getAllEmojis)
  .post(
    authController.restrictTo('admin'),
    emojiController.setPostUserIds,
    emojiController.createEmoji,
  );

router
  .route('/:id')
  .get(emojiController.getAllEmojis)
  .patch(authController.restrictTo('admin'), emojiController.updateEmoji)
  .delete(authController.restrictTo('admin'), emojiController.deleteEmoji);

module.exports = router;
