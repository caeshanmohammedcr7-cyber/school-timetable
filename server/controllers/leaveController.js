const LeaveRequest = require('../models/LeaveRequest');
const createLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.create(req.body);
    return res.status(201).json({ message: 'Leave request submitted successfully', leaveRequest });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().populate('user', 'name email role');
    return res.status(200).json(leaveRequests);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const approveLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'Approved' },
      { new: true, runValidators: true }
    ).populate('user', 'name email role');
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    return res.status(200).json({ message: 'Leave request approved', leaveRequest });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const rejectLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'Rejected' },
      { new: true, runValidators: true }
    ).populate('user', 'name email role');
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    return res.status(200).json({ message: 'Leave request rejected', leaveRequest });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = {
  createLeaveRequest,
  getAllLeaveRequests,
  approveLeaveRequest,
  rejectLeaveRequest,
};