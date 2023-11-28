const mongoose = require('mongoose');

const friendShipSchema = new mongoose.Schema({
  // sender
  userA: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: [true, 'Require use A'],
  },
  // receiver
  userB: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: [true, 'Require use B'],
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
  acceptDate: Date,
});

const FriendShip = mongoose.model('FriendShip', friendShipSchema);

module.exports = FriendShip;
