const { Course } = require('../models/Course');

async function getAll() {
  return Course.find().lean();
}

function getRecent() {
  return Course.find().sort({ _id: -1 }).limit(3).lean();
}

module.exports = {
  getAll,
  getRecent,
}