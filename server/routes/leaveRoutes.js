const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const {
  createLeaveRequest,
  getAllLeaveRequests,
  approveLeaveRequest,
  rejectLeaveRequest,
} = require('../controllers/leaveController');
router.use(authMiddleware);
router.post('/', createLeaveRequest);
router.get('/', authorizeRoles('admin'), getAllLeaveRequests);
router.put('/:id/approve', authorizeRoles('admin'), approveLeaveRequest);
router.put('/:id/reject', authorizeRoles('admin'), rejectLeaveRequest);
module.exports = router;