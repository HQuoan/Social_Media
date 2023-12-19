/* eslint-disable import/no-extraneous-dependencies */
// const moment = require('moment');
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
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
