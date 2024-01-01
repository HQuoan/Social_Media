const Room = require('../models/roomModel');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

exports.createRoom = catchAsync(async (req, res, next) => {
  const { roomName, members } = req.body;

  const existingRoom = await Room.findOne({ members: { $all: members } });

  if (existingRoom) {
    res.status(200).json({
      status: 'success',
      data: existingRoom,
    });
  }

  const newRoom = new Room({
    roomName,
    roomMaster: req.user.id,
    members: members,
  });

  // Save the new room to the database
  const room = await newRoom.save();

  res.status(200).json({
    status: 'success',
    data: room,
  });
});

exports.getMyRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.find({ members: { $in: [req.user.id] } });

  res.status(200).json({
    status: 'success',
    results: rooms.length,
    data: rooms,
  });
});

exports.getAllRooms = factory.getAll(Room);
exports.getRoom = factory.getOne(Room, { path: 'messages' });
exports.updateRoom = factory.updateOne(Room);
exports.deleteRoom = factory.deleteOne(Room);
