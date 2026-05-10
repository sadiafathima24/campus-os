const courseRoutes = require("./routes/courseRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const eventRoutes = require("./routes/eventRoutes");
const feeRoutes = require("./routes/feeRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const materialRoutes = require("./routes/materialRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use("/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/materials", materialRoutes);


app.get("/", (req, res) => {
  res.send("CampusOS Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});