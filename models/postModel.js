/* eslint-disable import/no-extraneous-dependencies */
const moment = require('moment');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
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
    // createDate: {
    //   type: Date,
    //   default: Date.now(),
    // },
    // updateDate: {
    //   type: Date,
    // },
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

  return `${days} dd: ${hours} hh: ${minutes} mm: ${seconds} ss`;
});

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
