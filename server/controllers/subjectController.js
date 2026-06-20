const Subject = require('../models/Subject');
const createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    return res.status(201).json({ message: 'Subject created successfully', subject });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate('teacher')
      .populate('class');
    return res.status(200).json(subjects);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id)
      .populate('teacher')
      .populate('class');
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    return res.status(200).json(subject);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    return res.status(200).json({ message: 'Subject updated successfully', subject });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    return res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};