const mongoose = require('mongoose');

const emojiSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Emoji must belong to a user.'],
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'Emoji must belong to a post.'],
    },
    type: {
      type: String,
      enum: [
        'like',
        'love',
        'happy',
        'haha',
        'think',
        'sade',
        'lovely',
        'angry',
        'null',
      ],
      default: 'like',
    },
  },
  {
    timestamps: true,
  },
);

emojiSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName  avatar',
  });

  next();
});

const Emoji = mongoose.model('Emoji', emojiSchema);

module.exports = Emoji;
