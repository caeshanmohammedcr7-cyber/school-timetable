const DEFAULT_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const generateDefaultTimeSlots = (periodsPerDay = 6, startTime = '08:00', durationMinutes = 45) => {
  const slots = [];
  let [hours, minutes] = startTime.split(':').map(Number);
  for (let i = 0; i < periodsPerDay; i++) {
    const start = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    minutes += durationMinutes;
    hours += Math.floor(minutes / 60);
    minutes %= 60;
    const end = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    slots.push({ startTime: start, endTime: end });
  }
  return slots;
};
const shuffle = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
const generateTimetable = ({
  classId,
  subjects,
  days = DEFAULT_DAYS,
  timeSlots = generateDefaultTimeSlots(),
  teacherSchedule = new Map(),
}) => {
  if (!classId) throw new Error('classId is required');
  if (!Array.isArray(subjects) || subjects.length === 0) {
    throw new Error('subjects array is required');
  }
  const grid = {};
  days.forEach((day) => {
    grid[day] = new Array(timeSlots.length).fill(null);
  });
  const subjectDayCount = {};
  subjects.forEach(({ subject }) => {
    subjectDayCount[subject] = {};
    days.forEach((day) => (subjectDayCount[subject][day] = 0));
  });
  let ticketPool = [];
  subjects.forEach(({ subject, teacher, periodsPerWeek }) => {
    for (let i = 0; i < periodsPerWeek; i++) {
      ticketPool.push({ subject, teacher });
    }
  });
  ticketPool = shuffle(ticketPool);
  const unscheduled = [];
  ticketPool.forEach((ticket) => {
    const { subject, teacher } = ticket;
    let placed = false;
    const dayOrder = shuffle(days);
    for (const day of dayOrder) {
      const alreadyOnThisDay = subjectDayCount[subject][day] > 0;
      const lessUsedDayExists = days.some((d) => subjectDayCount[subject][d] === 0);
      if (alreadyOnThisDay && lessUsedDayExists) continue;
      for (let periodIndex = 0; periodIndex < timeSlots.length; periodIndex++) {
        const slotFree = grid[day][periodIndex] === null;
        const teacherKey = `${teacher}_${day}_${periodIndex}`;
        const teacherFree = !teacherSchedule.has(teacherKey);
        if (slotFree && teacherFree) {
          grid[day][periodIndex] = { subject, teacher };
          teacherSchedule.set(teacherKey, classId);
          subjectDayCount[subject][day] += 1;
          placed = true;
          break;
        }
      }
      if (placed) break;
    }
    if (!placed) {
      unscheduled.push(ticket);
    }
  });
  const entries = [];
  days.forEach((day) => {
    grid[day].forEach((cell, periodIndex) => {
      if (cell) {
        entries.push({
          class: classId,
          subject: cell.subject,
          teacher: cell.teacher,
          day,
          startTime: timeSlots[periodIndex].startTime,
          endTime: timeSlots[periodIndex].endTime,
        });
      }
    });
  });
  return { entries, unscheduled, teacherSchedule };
};
module.exports = { generateTimetable, generateDefaultTimeSlots }; 