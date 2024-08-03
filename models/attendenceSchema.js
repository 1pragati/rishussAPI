const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employeId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Halfday'],
    default: 'Absent',
  },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
