const Emoji = require('../models/emojiModel');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setPostUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createEmojiClient = catchAsync(async (req, res, next) => {
  let emoji = Emoji.findOne({ user: req.body.user, post: req.body.post });

  if (!emoji) {
    emoji = await Emoji.create(req.body);
  }

  emoji.type = req.body.type;
  emoji.save();

  res.status(200).json({
    status: 'success',
    data: emoji,
  });
});

exports.createEmoji = catchAsync(async (req, res, next) => {
  const emoji = await Emoji.findOne({
    user: req.body.user,
    post: req.body.post,
  });

  if (emoji) {
    return next(new AppError("User's emoji for post already exists"));
  }

  const doc = await Emoji.create(req.body);

  res.status(201).json({
    status: 'success',
    data: doc,
  });
});

exports.getAllEmojis = factory.getAll(Emoji);
exports.getEmoji = factory.getOne(Emoji);
exports.updateEmoji = factory.updateOne(Emoji);
exports.deleteEmoji = factory.deleteOne(Emoji);
