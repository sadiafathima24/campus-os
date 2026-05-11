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
    grade: String,
  },
],
});

module.exports = mongoose.model("Assignment", assignmentSchema);