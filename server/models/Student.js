const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        rollNumber: {
            type: String,
            required: [true, 'Roll number is required'],
            unique: true,
            trim: true,
        },
        grade: {
            type: String,
            required: [true, 'Grade/class is required'],
            trim: true,
        },
        section: {
            type: String,
            trim: true,
        },
        dateOfBirth: {
            type: Date,
        },
        guardianName: {
            type: String,
            trim: true,
        },
        guardianContact: {
            type: String,
            trim: true,
        },
    },
    {timestamps: true}
);
module.exports = mongoose.model('Student', studentSchema);