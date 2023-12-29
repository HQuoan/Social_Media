const FriendShip = require('../models/friendShipModel');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.setSenderId = (req, res, next) => {
  req.body.sender = req.user.id;
  next();
};

exports.isYour = catchAsync(async (req, res, next) => {
  const friendShip = await FriendShip.findById(req.params.id);

  if (
    friendShip &&
    friendShip.sender.id !== req.user.id &&
    friendShip.receiver.id !== req.user.id
  ) {
    return next(
      new AppError('You do not have permission to perform this action', 403),
    );
  }

  next();
});

exports.isReceiver = catchAsync(async (req, res, next) => {
  const friendShip = await FriendShip.findById(req.params.id);

  if (friendShip && friendShip.receiver.id !== req.user.id) {
    return next(
      new AppError('You do not have permission to perform this action', 403),
    );
  }

  next();
});

exports.unfriend = catchAsync(async (req, res, next) => {
  const { sender, receiver } = req.body;

  if (!sender && !receiver) next();

  const friendShip = await FriendShip.findOne({
    $or: [
      { sender: sender, receiver: receiver },
      {
        sender: receiver,
        receiver: sender,
      },
    ],
  });

  if (!friendShip) {
    return next(new AppError('Friendship not found!'));
  }

  req.params.id = friendShip.id;

  next();
});

exports.getMyFriendShips = catchAsync(async (req, res, next) => {
  const friendShip = FriendShip.find({
    $or: [{ sender: req.user.id }, { receiver: req.user.id }],
  });

  const features = new APIFeatures(friendShip, req.query)
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

// admin
exports.createFriendShip = catchAsync(async (req, res, next) => {
  const { sender, receiver } = req.body;

  const friendShip = await FriendShip.findOne({
    $or: [
      { sender: sender, receiver: receiver },
      {
        sender: receiver,
        receiver: sender,
      },
    ],
  });

  if (friendShip) {
    return next(new AppError('Friendship already exists'));
  }

  const doc = await FriendShip.create({
    sender,
    receiver,
  });

  res.status(201).json({
    status: 'success',
    data: doc,
  });
});

exports.getAllFriendShips = factory.getAll(FriendShip);
exports.getFriendShip = factory.getOne(FriendShip);
exports.updateFriendShip = factory.updateOne(FriendShip);
exports.deleteFriendShip = factory.deleteOne(FriendShip);
