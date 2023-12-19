const moment = require('moment');
const mongoose = require('mongoose');
// const AppError = require('../utils/appError');

const commentSchema = new mongoose.Schema(
  {
    parentComment: {
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
    reply: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// commentSchema.index({ post: 1, user: 1, createAt: 1 }, { unique: true });

commentSchema.virtual('moment').get(function () {
  const { createdAt } = this;
  const rs = moment(createdAt).fromNow();

  return rs;
});

// commentSchema.pre('validate', function (next) {
//   if (!this.post && !this.parentComment) {
//     next(new AppError('Either post or parentComment must be provided.'));
//   } else {
//     next();
//   }
// });

// nó sẽ cập nhập cả cha của cha
commentSchema.pre('save', async function (next) {
  if (!this.parentComment) return next();

  const parentComment = await this.constructor.findById(this.parentComment);

  parentComment.reply += 1;
  parentComment.save();

  next();
});

commentSchema.virtual('childComments', {
  ref: 'Comment',
  foreignField: 'parentComment',
  localField: '_id',
});

// commentSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'childComments',
//   });

//   next();
// });
commentSchema.pre('save', function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName  avatar',
  });

  next();
});

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName  avatar',
  });

  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
