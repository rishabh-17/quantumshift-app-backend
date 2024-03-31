const mongoose = require("mongoose");
/* The code is defining a Mongoose schema for a blog. The schema specifies the structure and data types
of a blog object in a MongoDB collection. */

const sectionSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  video: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  audios: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
});

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
