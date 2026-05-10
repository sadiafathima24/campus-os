const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

const Course = require("../models/Course");

router.post("/create", async (req, res) => {
  try {

    const { title, description, teacher } = req.body;

    const course = new Course({
      title,
      description,
      teacher,
    });

    await course.save();

    res.status(201).json({
      message: "Course Created",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {

    const courses = await Course.find();

    res.json(courses);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/join/:id", async (req, res) => {
  try {

    const { studentName } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course.students.includes(studentName)) {
      course.students.push(studentName);
    }

    await course.save();

    res.json({
      message: "Joined Course",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.post("/leave/:id", async (req, res) => {
  try {

    const { studentName } = req.body;

    const course = await Course.findById(req.params.id);

    course.students = course.students.filter(
      (student) => student !== studentName
    );

    await course.save();

    res.json({
      message: "Left Course",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {

    const course = await Course.findById(req.params.id);

    await Assignment.deleteMany({
      course: course.title,
    });

    await Course.findByIdAndDelete(req.params.id);

    res.json({
      message: "Course and Assignments Deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;