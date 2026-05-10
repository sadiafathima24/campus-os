const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  student: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model(
  "Complaint",
  complaintSchema
);