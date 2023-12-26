const FriendShip = require('../models/friendShipModel');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
// const APIFeatures = require('./../utils/apiFeatures');
// const AppError = require('../utils/appError');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'noLogin') {
    res.locals.alert = 'You are not logged in! Please log in to get access.';
    return res.status(200).render('./authentication/login', {
      title: 'Log in',
    });
  }
  next();
};

exports.getHomePage = catchAsync(async (req, res, next) => {
  const posts = await Post.find().limit(2).sort('-createdAt'); //

  res.status(200).render('home', {
    title: 'Home',
    posts,
  });
});

exports.getFormLogin = (req, res) => {
  res.status(200).render('./authentication/login', {
    title: 'Log in',
  });
};

exports.getFormSignUp = (req, res) => {
  res.status(200).render('./authentication/sign-up', {
    title: 'Sign up',
  });
};

exports.getFormForgotPassword = (req, res) => {
  res.status(200).render('./authentication/forgot-password', {
    title: 'Forgot Password',
  });
};

exports.getFormResetPassword = (req, res) => {
  res.status(200).render('./authentication/reset-password', {
    title: 'Reset Password',
  });
};

exports.getGroup = (req, res) => {
  res.status(200).render('group', {
    title: 'Group',
  });
};

exports.getFriendRequest = catchAsync(async (req, res) => {
  const friendRequest = await FriendShip.find({
    receiver: req.user.id,
    status: 'pending',
  });

  const friends = await FriendShip.find({
    $or: [{ sender: req.user.id }, { receiver: req.user.id }],
    status: 'accepted',
  });

  const friendRequestIds = friendRequest.map((request) => request.sender);
  const friendIds = friends.reduce((ids, friend) => {
    ids.push(friend.sender, friend.receiver);
    return ids;
  }, []);

  const nonFriend = await User.find({
    _id: {
      $nin: [...friendRequestIds, ...friendIds, req.user.id],
    },
  });

  // console.log('friendRequest : ', friendRequest);
  // console.log('friends : ', friends);
  // console.log('friendRequestIds : ', friendRequestIds);
  // console.log('friendIds : ', friendIds);
  // console.log('nonFriend : ', nonFriend);

  res.status(200).render('friend-request', {
    title: 'Friend Request',
    friends,
    friendRequest,
    nonFriend,
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('./account/account', {
    title: 'My account',
  });
});

exports.getMyProfile = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ user: req.user.id })
    .limit(2)
    .sort('-createdAt');

  const friends = await FriendShip.find({
    $or: [{ sender: req.user.id }, { receiver: req.user.id }],
    status: 'accepted',
  });

  // console.log(posts);
  res.status(200).render('./account/profile', {
    title: 'Profile',
    posts,
    friends,
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  const your = await User.findById(req.params.userId);
  const posts = await Post.find({ user: req.params.userId })
    .limit(2)
    .sort('-createdAt');

  const friends = await FriendShip.find({
    $or: [{ sender: req.params.userId }, { receiver: req.params.userId }],
    status: 'accepted',
  });

  // console.log(posts);
  res.status(200).render('./account/friend-profile', {
    title: `${your.firstName}'s profile`,
    your,
    posts,
    friends,
  });
});
