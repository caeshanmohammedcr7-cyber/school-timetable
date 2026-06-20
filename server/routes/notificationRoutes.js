const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const {
  sendNotification,
  getNotifications,
  markNotificationRead,
} = require('../controllers/notificationController');
router.use(authMiddleware);
router.get('/:userId', getNotifications);
router.put('/:id/read', markNotificationRead);
router.post('/', authorizeRoles('admin', 'teacher'), sendNotification);
module.exports = router; 