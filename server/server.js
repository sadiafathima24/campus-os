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
app.use("/courses", courseRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/materials", materialRoutes);
app.use("/fees", feeRoutes);
app.use("/complaints", complaintRoutes);
app.use("/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("CampusOS Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});