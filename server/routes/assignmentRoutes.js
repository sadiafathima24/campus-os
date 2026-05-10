const express = require("express");
const router = express.Router();
const multer = require("multer");

const Assignment = require("../models/Assignment");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({ storage });

router.post("/create", async (req, res) => {
  try {

    const { course, title, description } = req.body;

    const assignment = new Assignment({
      course,
      title,
      description,
    });

    await assignment.save();

    res.status(201).json({
      message: "Assignment Created",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {

    const assignments = await Assignment.find();

    res.json(assignments);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post(
  "/submit/:id",
  upload.single("file"),
  async (req, res) => {
    try {

      const { student } = req.body;

      const assignment = await Assignment.findById(
        req.params.id
      );

      assignment.submissions.push({
        student,
        file: req.file.filename,
      });

      await assignment.save();

      res.json({
        message: "Assignment Submitted",
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.post(
  "/grade/:id/:submissionIndex",
  async (req, res) => {
    try {

      const { grade } = req.body;

      const assignment = await Assignment.findById(
        req.params.id
      );

      assignment.submissions[
        req.params.submissionIndex
      ].grade = grade;

      await assignment.save();

      res.json({
        message: "Assignment Graded",
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {

    await Assignment.findByIdAndDelete(req.params.id);

    res.json({
      message: "Assignment Deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;