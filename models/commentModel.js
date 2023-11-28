const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    commentParents: {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'Comment must belong to a post.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user.'],
    },
    comment: {
      type: String,
      required: [true, 'Please fill in the content'],
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
    updateDate: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

commentSchema.index({ post: 1, user: 1, comment: 1 }, { unique: true });

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName  avatar',
  });

  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
