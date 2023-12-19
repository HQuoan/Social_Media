const catchAsync = require('./../utils/catchAsync');
const Comment = require('../models/commentModel');
const factory = require('./handlerFactory');

exports.setPostUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

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
exports.deleteComment = factory.deleteOne(Comment);
