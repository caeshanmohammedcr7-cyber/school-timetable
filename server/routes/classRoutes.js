const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} = require('../controllers/classController');
router.use(authMiddleware);
router.get('/', getAllClasses);
router.get('/:id', getClassById);
router.post('/', authorizeRoles('admin'), createClass);
router.put('/:id', authorizeRoles('admin'), updateClass);
router.delete('/:id', authorizeRoles('admin'), deleteClass);
module.exports = router; 