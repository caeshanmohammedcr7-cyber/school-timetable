const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const {
  createTimetableEntry,
  getClassTimetable,
  updateTimetableEntry,
  deleteTimetableEntry,
} = require('../controllers/timetableController');
router.use(authMiddleware);
router.get('/class/:classId', getClassTimetable);
router.post('/', authorizeRoles('admin'), createTimetableEntry);
router.put('/:id', authorizeRoles('admin'), updateTimetableEntry);
router.delete('/:id', authorizeRoles('admin'), deleteTimetableEntry);
module.exports = router; 