const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const {
  markAttendance,
  getAttendanceByStudent,
  getAttendanceByClass,
  updateAttendance,
} = require('../controllers/attendanceController');
router.use(authMiddleware);
router.get('/student/:studentId', getAttendanceByStudent);
router.get('/class/:classId', getAttendanceByClass);
router.post('/', authorizeRoles('teacher', 'admin'), markAttendance);
router.put('/:id', authorizeRoles('teacher', 'admin'), updateAttendance);
module.exports = router; 