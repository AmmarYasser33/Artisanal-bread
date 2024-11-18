const authRoutes = require("../routes/authRoutes");
const categoryRoutes = require("../routes/categoryRoutes");

const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/categories", categoryRoutes);
};

module.exports = mountRoutes;
