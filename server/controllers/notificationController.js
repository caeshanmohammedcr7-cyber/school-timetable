const Notification = require('../models/Notification');
const sendNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    return res.status(201).json({ message: 'Notification sent successfully', notification });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipients: req.params.userId })
      .populate('sender', 'name email role')
      .sort({ createdAt: -1 });
    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true, runValidators: true }
    );
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    return res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = {
  sendNotification,
  getNotifications,
  markNotificationRead,
};