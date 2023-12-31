/* eslint-disable*/

let onlineUsers = [];

const addUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

exports.socket = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected');

    //take userId and socketId from user
    socket.on('addUser', (userId) => {
      addUser(userId, socket.id);
      io.emit('getOnlineUsers', onlineUsers);
    });

    //send and get message
    socket.on('sendMessage', (data) => {
      const { sender, receiver, text } = data;
      console.log('cos tin nhan');
      console.log(data);
      const user = getUser(receiver);
      if (user) {
        io.to(user.socketId).emit('getMessage', {
          sender,
          text,
        });
      }
    });

    //when disconnect
    socket.on('disconnect', () => {
      console.log('a user disconnected!');
      removeUser(socket.id);
      io.emit('getOnlineUsers', onlineUsers);
    });
  });
};
