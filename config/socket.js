let io;

const init = (server) => {
  io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (client) => {
    console.log("Client connected");
    client.on("send_message", (data) => {
      client.to(data.roomId).emit("receive_message", {
        message: data.message,
        userId: data.userId,
      });
    });
    client.on("join_session", (data) => {
      client.join(data.roomId);
    });
    client.on("leave_session", (data) => {
      client.leave(data.roomId);
    });
  });

  return io;
};

const getIO = () => io;

module.exports = { init, getIO };
