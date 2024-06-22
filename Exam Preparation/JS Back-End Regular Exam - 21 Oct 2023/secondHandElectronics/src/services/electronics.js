const { Electronic } = require('../models/Electronics');

async function getAll() {
  return Electronic.find().lean();
}

module.exports = {
  getAll
}