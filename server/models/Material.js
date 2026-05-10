const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  file: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "Material",
  materialSchema
);