const authRoutes = require("../routes/authRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const productRoutes = require("../routes/productRoutes");
const courseRoutes = require("../routes/courseRoutes");

const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/categories", categoryRoutes);
  app.use("/api/v1/products", productRoutes);
  app.use("/api/v1/courses", courseRoutes);
};

module.exports = mountRoutes;
