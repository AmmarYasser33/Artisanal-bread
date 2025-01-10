const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const courseRoutes = require("./courseRoutes");
const cartRoutes = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");
const chefRoutes = require("./chefRoutes");
const testimonialRoutes = require("./testimonialRoutes");
const staticsRoutes = require("./staticsRoutes");
const configRoutes = require("./configRoutes");

const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/categories", categoryRoutes);
  app.use("/api/v1/products", productRoutes);
  app.use("/api/v1/courses", courseRoutes);
  app.use("/api/v1/cart", cartRoutes);
  app.use("/api/v1/orders", orderRoutes);
  app.use("/api/v1/chefs", chefRoutes);
  app.use("/api/v1/testimonials", testimonialRoutes);
  app.use("/api/v1/statics", staticsRoutes);
  app.use("/api/v1/configs", configRoutes);
};

module.exports = mountRoutes;
