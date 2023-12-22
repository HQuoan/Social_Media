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

exports.getAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('./account/account', {
    title: 'My account',
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const posts = await Post.find({ user: req.user.id })
    .limit(2)
    .sort('-createdAt');

  // console.log(posts);
  res.status(200).render('./account/profile', {
    title: 'Profile',
    user,
    posts,
  });
});
