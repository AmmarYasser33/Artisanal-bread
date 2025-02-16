const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    arName: {
      type: String,
      required: true,
    },
    enName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
