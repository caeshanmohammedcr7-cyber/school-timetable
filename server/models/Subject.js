const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true,
    },
    subjectCode: {
      type: String,
      required: [true, 'Subject code is required'],
      unique: true,
      trim: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
    },
    credits: {
      type: Number,
      required: [true, 'Credits are required'],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Subject', subjectSchema);