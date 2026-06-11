const dotenv = require("dotenv");
const express = require("express");
dotenv.config();
const app = express();
const db = require("./db.js");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const interviewRoutes=require("./routes/interviewRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/interview",interviewRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});