const { Recipe } = require('../models/Recipe');

async function getRecent() {
  return Recipe.find().sort({ _id: -1 }).limit(3).lean();
}

async function getAll() {
  return Recipe.find().lean()
}

module.exports = {
  getRecent,
  getAll
}