const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  submissions: [
    {
      student: String,

      file: String,

      grade: {
        type: Number,
        default: null,
      },
    },
  ],
});

module.exports = mongoose.model("Assignment", assignmentSchema);