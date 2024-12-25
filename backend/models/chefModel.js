const mongoose = require("mongoose");

const chefSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    facebook: String,
    instagram: String,
    whatsapp: String,
    twitter: String,
  },
  { timestamps: true }
);

const Chef = mongoose.model("Chef", chefSchema);

module.exports = Chef;
