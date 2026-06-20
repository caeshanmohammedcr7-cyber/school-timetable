const Student = require('../models/Student');
const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    return res.status(201).json({ message: 'Student created successfully', student });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('user', 'name email role');
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('user', 'name email role');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.status(200).json({ message: 'Student updated successfully', student });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
}; 