/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const catchAsync = require('./../utils/catchAsync');
const Comment = require('../models/commentModel');
const factory = require('./handlerFactory');
const APIFeatures = require('./../utils/apiFeatures');
// const AppError = require('./../utils/appError');

exports.setPostUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.getParentComments = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Comment.find({ parentComment: null }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: doc,
  });
});

exports.getCommentReply = catchAsync(async (req, res, next) => {
  const commentsReply = await Comment.find({ parentComment: req.params.id });

  res.status(200).json({
    status: 'success',
    results: commentsReply.length,
    data: commentsReply,
  });
});

exports.isYour = factory.isYour(Comment);
exports.getMyComments = factory.getMy(Comment);

//admin
exports.getAllComments = factory.getAll(Comment);
exports.getComment = factory.getOne(Comment);
exports.createComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment);

const decrementReplyCount = async (parentCommentId, decrementBy) => {
  if (parentCommentId) {
    do {
      const doc = await Comment.findByIdAndUpdate(parentCommentId, {
        $inc: { reply: -decrementBy },
      });

      parentCommentId = doc.parentComment;
    } while (parentCommentId);
  }

  // await Comment.findByIdAndUpdate(parentCommentId, {
  //   $inc: { reply: -decrementBy },
  // });
};
const deleteCommentAndDescendants = async (commentId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return 0; // Comment not found, nothing to delete, return 0 deleted comments
  }
  // Keep track of deleted comments count
  let deletedCount = 1;
  // Recursively delete child comments
  const listChildComments = await Comment.find({ parentComment: comment._id });
  for (const childComment of listChildComments) {
    deletedCount += await deleteCommentAndDescendants(
      childComment._id,
      commentId,
    );
  }
  // Delete the current comment
  await Comment.findByIdAndDelete(commentId);
  // Return the count of deleted comments
  return deletedCount;
};
exports.deleteComment = catchAsync(async (req, res, next) => {
  const commentId = req.params.id;
  const comment = await Comment.findById(commentId);
  const parentCommentId = comment ? comment.parentComment : null;
  const deletedCount = await deleteCommentAndDescendants(commentId);
  // Update parent comment's reply count if a parent exists
  if (parentCommentId) {
    await decrementReplyCount(parentCommentId, deletedCount);
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
