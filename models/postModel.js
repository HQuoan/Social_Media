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

postSchema.virtual('countComment', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
  count: true,
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName avatar',
  })
    .populate({
      path: 'countComment',
    })
    .populate({
      path: 'comments',
      match: { parentComment: null },
      options: {
        limit: 2,
        sort: { createdAt: -1 },
      },
    });

  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
