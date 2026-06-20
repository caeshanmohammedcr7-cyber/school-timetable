const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require('../controllers/teacherController');
router.use(authMiddleware);
router.get('/', getTeachers);
router.get('/:id', getTeacherById);
router.post('/', authorizeRoles('admin'), createTeacher);
router.put('/:id', authorizeRoles('admin'), updateTeacher);
router.delete('/:id', authorizeRoles('admin'), deleteTeacher);
module.exports = router; 