const mongoose = require('mongoose');

const friendShipSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      require: [true, 'Require sender'],
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      require: [true, 'Require receiver'],
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

friendShipSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'sender',
    select: 'firstName lastName  avatar',
  }).populate({
    path: 'receiver',
    select: 'firstName lastName  avatar',
  });

  next();
});

const FriendShip = mongoose.model('FriendShip', friendShipSchema);

module.exports = FriendShip;
