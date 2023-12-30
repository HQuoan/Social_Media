/* eslint-disable */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { socket } = require('./socket/socket');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);

socket(io);

const port = process.env.PORT || 3000;
const sv = server.listen(port, () => {
  console.log(`App running on port http://localhost:${port}....`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTED! 💥 Shutting down...');
  console.log(err.name, err.message);
  sv.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  sv.close(() => {
    console.log('💥 Process terminated!');
  });
});
