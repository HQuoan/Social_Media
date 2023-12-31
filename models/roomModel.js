const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    roomName: String,
    roomMaster: String,
    members: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      ],
      validate: {
        validator: function (members) {
          return members.length >= 2;
        },
        message: 'The room requires at least 2 members.',
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

roomSchema.virtual('messages', {
  ref: 'Message',
  foreignField: 'room',
  localField: '_id',
});

roomSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'members',
    select: 'firstName lastName avatar key',
  });

  next();
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
