require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.get("/", (req, res) => {
    res.status(200).json ({
        success: true,
        message: "School Timetable API Running",
    });
});
app.use("/api/auth", authRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use((req, res) => {
    res.status(404).json ({
        success: false,
        message: "Route not found",
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode||500).json ({
        success: false,
        message: err.message||"Internal Server Error",
    });
});
const PORT = process.env.PORT||5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});