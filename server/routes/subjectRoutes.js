const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} = require('../controllers/subjectController');
router.use(authMiddleware);
router.get('/', getAllSubjects);
router.get('/:id', getSubjectById);
router.post('/', authorizeRoles('admin'), createSubject);
router.put('/:id', authorizeRoles('admin'), updateSubject);
router.delete('/:id', authorizeRoles('admin'), deleteSubject);
module.exports = router; 