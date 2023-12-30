const express = require('express');
const friendShipController = require('../controllers/friendShipController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/friends', friendShipController.getFriends);

router
  .route('/me')
  .get(friendShipController.getMyFriendShips)
  .post(
    friendShipController.setSenderId,
    friendShipController.createFriendShip,
  );

router
  .route('/me/:id')
  .patch(friendShipController.isReceiver, friendShipController.updateFriendShip)
  .delete(
    friendShipController.isYour,
    friendShipController.unfriend,
    friendShipController.deleteFriendShip,
  );

// admin
router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(friendShipController.getAllFriendShips)
  .post(friendShipController.createFriendShip);

router
  .route('/:id')
  .get(friendShipController.getFriendShip)
  .patch(friendShipController.updateFriendShip)
  .delete(friendShipController.deleteFriendShip);

module.exports = router;
