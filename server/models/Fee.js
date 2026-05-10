const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  title: String,

  amount: Number,

  dueDate: String,

  paidStudents: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Fee", feeSchema);