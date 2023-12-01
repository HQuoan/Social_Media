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
      enum: ['public', 'friend', 'private'],
      default: 'public',
    },
    createDate: {
      type: Date,
      default: Date.now(),
    },
    updateDate: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

postSchema.virtual('comments', {
  ref: 'Comments',
  foreignField: 'post',
  localField: '_id',
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
