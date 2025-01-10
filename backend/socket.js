const { Server } = require("socket.io");

let io; // Define io in module scope for access within this module

const initSocketIO = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Update this with your allowed origins
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("message", (data) => {
      console.log(`Message received from ${socket.id}:`, data);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

const emitEvent = (eventName, data) => {
  if (!io) {
    console.error("Socket.IO is not initialized. Call initSocketIO first.");
    return;
  }
  io.emit(eventName, data);
  console.log(`Event emitted: ${eventName}`);
};

module.exports = { initSocketIO, emitEvent };
