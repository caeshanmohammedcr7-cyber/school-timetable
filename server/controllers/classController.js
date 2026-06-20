const Class = require('../models/Class');
const createClass = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    return res.status(201).json({ message: 'Class created successfully', class: newClass });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate('classTeacher')
      .populate('students');
    return res.status(200).json(classes);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getClassById = async (req, res) => {
  try {
    const foundClass = await Class.findById(req.params.id)
      .populate('classTeacher')
      .populate('students');
    if (!foundClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    return res.status(200).json(foundClass);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    return res.status(200).json({ message: 'Class updated successfully', class: updatedClass });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    return res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};