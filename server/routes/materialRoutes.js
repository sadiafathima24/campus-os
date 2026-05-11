const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const Material = require("../models/Material");

router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {

    try {

      const {
        title,
        course,
        teacher,
      } = req.body;

      const newMaterial =
        new Material({
          title,
          course,
          teacher,
          file: req.file.filename,
        });

      await newMaterial.save();

      res.status(201).json({
        message:
          "Material uploaded successfully",
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

    const materials =
      await Material.find();

    res.json(materials);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;