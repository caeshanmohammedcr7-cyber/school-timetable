const { body, validationResult } = require('express-validator');
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['admin', 'teacher', 'student'])
    .withMessage('Role must be admin, teacher, or student'),
];
const loginValidation = [
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];
const classValidation = [
  body('className').trim().notEmpty().withMessage('Class name is required'),
  body('semester').trim().notEmpty().withMessage('Semester is required'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('classTeacher').optional().isMongoId().withMessage('classTeacher must be a valid ID'),
  body('students').optional().isArray().withMessage('students must be an array of IDs'),
];
const subjectValidation = [
  body('subjectName').trim().notEmpty().withMessage('Subject name is required'),
  body('subjectCode').trim().notEmpty().withMessage('Subject code is required'),
  body('teacher').optional().isMongoId().withMessage('teacher must be a valid ID'),
  body('class').optional().isMongoId().withMessage('class must be a valid ID'),
  body('credits').isNumeric().withMessage('Credits must be a number'),
];
const attendanceValidation = [
  body('student').isMongoId().withMessage('student must be a valid ID'),
  body('class').isMongoId().withMessage('class must be a valid ID'),
  body('subject').isMongoId().withMessage('subject must be a valid ID'),
  body('teacher').isMongoId().withMessage('teacher must be a valid ID'),
  body('date').isISO8601().withMessage('date must be a valid date'),
  body('status')
    .isIn(['Present', 'Absent', 'Late'])
    .withMessage('status must be Present, Absent, or Late'),
];
module.exports = {
  validate,
  registerValidation,
  loginValidation,
  classValidation,
  subjectValidation,
  attendanceValidation,
};