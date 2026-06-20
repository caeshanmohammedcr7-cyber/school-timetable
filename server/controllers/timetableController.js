const Timetable = require('../models/Timetable');
const createTimetableEntry = async (req, res) => {
  try {
    const entry = await Timetable.create(req.body);
    return res.status(201).json({ message: 'Timetable entry created successfully', entry });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getClassTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find({ class: req.params.classId })
      .populate('class')
      .populate('teacher')
      .populate('subject');
    return res.status(200).json(timetable);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const updateTimetableEntry = async (req, res) => {
  try {
    const entry = await Timetable.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('class')
      .populate('teacher')
      .populate('subject');
    if (!entry) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }
    return res.status(200).json({ message: 'Timetable entry updated successfully', entry });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const deleteTimetableEntry = async (req, res) => {
  try {
    const entry = await Timetable.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }
    return res.status(200).json({ message: 'Timetable entry deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = {
  createTimetableEntry,
  getClassTimetable,
  updateTimetableEntry,
  deleteTimetableEntry,
};