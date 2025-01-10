const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const { initSocketIO } = require("./socket");

process.on("uncaughtException", (err) => {
  console.log("Unhandled Exception! 💥 Shutting down... ", err);
  process.exit(1);
});

dotenv.config();
const app = require("./app");

const server = http.createServer(app);

initSocketIO(server);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    // process.exit(1); // Exit if the database connection fails
  }
};

const startServer = () => {
  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log(`🚀 App running on port ${port}`);
  });
};

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! 💥 Shutting down... ", err);
  server.close(() => {
    process.exit(1);
  });
});

// Gracefully handle termination signals (e.g., SIGTERM)
process.on("SIGTERM", () => {
  console.log("💥 SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("🛑 Process terminated.");
  });
});

const initializeApp = async () => {
  await connectDB();
  startServer();
};

initializeApp();
