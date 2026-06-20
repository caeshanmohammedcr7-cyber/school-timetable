const Attendance = require('../models/Attendance');
const markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    return res.status(201).json({ message: 'Attendance marked successfully', attendance });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getAttendanceByStudent = async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.params.studentId })
      .populate('student')
      .populate('class')
      .populate('subject')
      .populate('teacher');
    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getAttendanceByClass = async (req, res) => {
  try {
    const records = await Attendance.find({ class: req.params.classId })
      .populate('student')
      .populate('class')
      .populate('subject')
      .populate('teacher');
    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('student')
      .populate('class')
      .populate('subject')
      .populate('teacher');
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    return res.status(200).json({ message: 'Attendance updated successfully', attendance });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = {
  markAttendance,
  getAttendanceByStudent,
  getAttendanceByClass,
  updateAttendance,
}; 