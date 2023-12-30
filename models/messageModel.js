const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.ObjectId,
      ref: 'Room',
      required: [true, 'Message must belong to a room.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Message must belong to a user.'],
    },
    content: {
      type: String,
      trim: true,
      minlength: [1, 'Content must be at least 1 characters.'],
    },
  },
  {
    timestamps: true,
  },
);

messageSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName  avatar key',
  });

  next();
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
