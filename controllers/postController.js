const Post = require('../models/postModel');
const factory = require('../controllers/handlerFactory');

exports.setUserIds = (req, res, next) => {
  // Allow nested routes //admin
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.isYour = factory.isYour(Post);
exports.getMyPosts = factory.getMy(Post);

// admin
exports.getAllPosts = factory.getAll(Post);
exports.createPost = factory.createOne(Post);
exports.getPost = factory.getOne(Post, { path: 'comments' });
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);
