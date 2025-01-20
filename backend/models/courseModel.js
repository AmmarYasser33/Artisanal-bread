const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    arTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    arDescription: {
      type: String,
      required: true,
    },
    isOnline: {
      type: Boolean,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    arDuration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      required: true,
    },
    arRequirements: {
      type: [String],
      required: true,
    },
    content: {
      type: [String],
      required: true,
    },
    arContent: {
      type: [String],
      required: true,
    },
    lessons: {
      type: [
        {
          title: String,
          arTitle: String,
          video: String,
        },
      ],
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
