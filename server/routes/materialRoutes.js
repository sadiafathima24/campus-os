const express = require("express");
const router = express.Router();
const multer = require("multer");

const Material = require("../models/Material");

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

router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {

      const { course, title } = req.body;

      const material = new Material({
        course,
        title,
        file: req.file.filename,
      });

      await material.save();

      res.json({
        message: "Material Uploaded",
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

    const materials = await Material.find();

    res.json(materials);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;