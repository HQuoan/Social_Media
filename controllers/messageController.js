const Message = require('../models/messageModel');
const Room = require('../models/roomModel');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createMessageClient = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.body.room);

  if (!room) {
    return next(new AppError('Room not found'));
  }

  const isMember = room.members.some((user) => user.id === req.user.id);

  if (!isMember) {
    return next(new AppError('You are not a member of this room', 400));
  }

  const message = await Message.create(req.body);

  res.status(201).json({
    status: 'success',
    data: message,
  });
});

exports.isYour = factory.isYour(Message);
exports.getMyMessages = factory.getMy(Message);

exports.getAllMessages = factory.getAll(Message);
exports.createMessage = factory.createOne(Message);
exports.getMessage = factory.getOne(Message);
exports.updateMessage = factory.updateOne(Message);
exports.deleteMessage = factory.deleteOne(Message);
