/* eslint-disable import/no-extraneous-dependencies */
const moment = require('moment');
const mongoose = require('mongoose');
const dayAgo = require('../utils/dayAgo');

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
  const currentTime = moment();

  const duration = moment.duration(currentTime.diff(createdAt));

  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  const rs = dayAgo(`${days} dd: ${hours} hh: ${minutes} mm: ${seconds} ss`);

  return rs;
});

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
