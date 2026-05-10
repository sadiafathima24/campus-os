const express = require("express");
const router = express.Router();

const Fee = require("../models/Fee");

router.post("/create", async (req, res) => {
  try {

    const fee = new Fee(req.body);

    await fee.save();

    res.json({
      message: "Fee Added",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {

    const fees = await Fee.find();

    res.json(fees);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.post("/pay/:id", async (req, res) => {
  try {

    const { studentName } = req.body;

    const fee = await Fee.findById(req.params.id);

    if (!fee.paidStudents.includes(studentName)) {
      fee.paidStudents.push(studentName);
    }

    await fee.save();

    res.json({
      message: "Fee Paid",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;