const express = require("express");
const router = express.Router();

const Complaint = require("../models/Complaint");

router.post("/create", async (req, res) => {
  try {

    const complaint = new Complaint(req.body);

    await complaint.save();

    res.json({
      message: "Complaint Submitted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {

    const complaints = await Complaint.find();

    res.json(complaints);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/resolve/:id", async (req, res) => {
  try {

    await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        status: "Resolved",
      }
    );

    res.json({
      message: "Complaint Resolved",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;