const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const Assignment =
  require("../models/Assignment");

router.post(
  "/create",
  async (req, res) => {

    try {

      const assignment =
        new Assignment(req.body);

      await assignment.save();

      res.status(201).json({
        message:
          "Assignment created",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.get("/", async (req, res) => {

  try {

    const assignments =
      await Assignment.find();

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

      const assignment =
        await Assignment.findById(
          req.params.id
        );

      assignment.submissions.push({
        student: req.body.student,
        file: req.file.filename,
        grade: null,
      });

      await assignment.save();

      res.json({
        message:
          "Assignment submitted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;