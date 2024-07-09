/* eslint-disable no-undef */
const { Server } = require("socket.io");
const { saveMsg } = require("../controller/message");

const onlineUsers = [];

const addUser = (user, socketId) => {
  const isExist = onlineUsers.findIndex((item) => item._id === user._id);

  if (isExist !== -1) {
    onlineUsers.splice(isExist, 1);
  }

  user.socketId = socketId;
  const result = onlineUsers.push(user);
  return result;
};

const removeUser = (socketId) => {
  const isExist = onlineUsers.findIndex((item) => item.socketId === socketId);

  if (isExist !== -1) {
    onlineUsers.splice(isExist, 1);
  }
};

const socketInit = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "https://chat-app-nodejs.vercel.app",
        "/*",
        "*",
        "http://localhost:5000",
      ],
    },
  });

  io.on("connection", (socket) => {
    // console.log(socket.id);
    socket.on("ADD_USER", (user) => {
      // console.log(user); // logedin => from auth from front end
      addUser(user, socket.id);
      io.emit("USER_ADDED", onlineUsers);
    });

    socket.on("SEND_MSG", async (msg) => {
      console.log(msg, `Msg From Front-End`);
      const isSave = await saveMsg(msg);
      io.to(msg.receiver.socketId)
        .to(msg.sender.socketId)
        .emit("RECEIVER_MSG", isSave);
    });

    socket.on("DELETE_MSG", (msg) => {
      socket.to(msg.receiver.socketId).emit("DELETED_MSG", msg);
    });

    socket.on("disconnect", () => {
      // console.log(socket.id);
      removeUser(socket.id);
      io.emit("USER_ADDED", onlineUsers);
    });
  });
};

module.exports = socketInit;
