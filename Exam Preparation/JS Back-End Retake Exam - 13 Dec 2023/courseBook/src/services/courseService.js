const { Course } = require('../models/Course');

function getRecent() {
  return Course.find().sort({ _id: -1 }).limit(3).lean();
}

module.exports = {
  getRecent
}