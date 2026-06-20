const teacherMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Forbidden: Teachers only' });
  }
  next();
};
module.exports = teacherMiddleware; 