/* eslint-disable import/no-extraneous-dependencies */
const moment = require('moment');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user.'],
    },
    content: {
      type: String,
      trim: true,
      required: [true, 'A post must have a content'],
    },
    images: [String],
    status: {
      type: String,
      enum: ['public', 'friends', 'private'],
      default: 'public',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

postSchema.virtual('moment').get(function () {
  const { createdAt } = this;
  const rs = moment(createdAt).fromNow();

  return rs;
});

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName avatar',
  }).populate({
    path: 'comments',
    perDocumentLimit: 0,
    options: { limit: 2 },
  });

  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
