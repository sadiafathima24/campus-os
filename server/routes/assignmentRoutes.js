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
          "Assignment created successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.get(
  "/",
  async (req, res) => {

    try {

      const assignments =
        await Assignment.find();

      res.json(assignments);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.post(
  "/submit/:id",
  upload.single("file"),
  async (req, res) => {

    try {

      const assignment =
        await Assignment.findById(
          req.params.id
        );

      if (!assignment) {

        return res.status(404).json({
          message:
            "Assignment not found",
        });
      }

      assignment.submissions.push({
        student: req.body.student,
        file: req.file
          ? req.file.filename
          : "",
        grade: null,
      });

      await assignment.save();

      res.json({
        message:
          "Assignment submitted successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.post(
  "/grade/:id",
  async (req, res) => {

    try {

      const assignment =
        await Assignment.findById(
          req.params.id
        );

      if (!assignment) {

        return res.status(404).json({
          message:
            "Assignment not found",
        });
      }

      const submission =
        assignment.submissions.id(
          req.body.submissionId
        );

      if (!submission) {

        return res.status(404).json({
          message:
            "Submission not found",
        });
      }

      submission.grade =
        req.body.grade;

      await assignment.save();

      res.json({
        message:
          "Assignment graded successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;