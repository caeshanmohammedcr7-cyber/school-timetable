const { json } = require('express');
const Teacher = require('../models/Teacher');
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().populate('user', 'name email role');
        return res.status(200).json(teachers);
    } catch (error) {
        return res.status(500).json({message: 'Server error', error: error.message});
    }
};
const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id).populate('user', 'name email role');
        if(!teacher) {
            return res.status(404).json({message: 'Teacher not found'});
        }
        return res.status(200).json(teacher);
    } catch (error) {
        return res.status(500).json({message: 'Server error', error: error.message});
    }
};
const createTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.create(req.body);
        return res.status(201),json({message: 'Teacher created successfully', teacher});
    } catch (error) {
        return res.status(500).json({message: 'Server error', error: error.message});
    }
};
const updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if(!teacher) {
            return res.status(404).json({message: 'Teacher not found'});
        }
        return res.status(200).json({message: 'Teacher updated successfully', teacher});
    } catch (error) {
        return res.status(500).json({message: 'Server error', error: error.message});
    }
};
const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!teacher) {
            return res.status(404).json({message: 'Teacher not found'});
        }
        return res.status(200).json({message: 'Teacher deleted successfully'});
    } catch (error) {
        return res.status(500).json({message: 'Server error', error: error.message});
    }
};
module.exports = {
    getTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher,
};