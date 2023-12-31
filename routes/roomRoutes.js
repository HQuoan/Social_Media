const express = require('express');
const roomController = require('../controllers/roomController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/me')
  .get(roomController.getMyRooms)
  .post(roomController.createRoom);

router.route('/me/:id').get(roomController.getRoom);

router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(roomController.getAllRooms)
  .post(roomController.createRoom);

router
  .route('/:id')
  .get(roomController.getRoom)
  .patch(roomController.updateRoom)
  .delete(roomController.deleteRoom);

module.exports = router;
