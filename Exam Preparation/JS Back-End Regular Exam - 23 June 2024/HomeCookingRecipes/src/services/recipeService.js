const { Recipe } = require('../models/Recipe');

async function getRecent() {
  return Recipe.find().sort({ _id: -1 }).limit(3).lean();
}

async function getAll() {
  return Recipe.find().lean()
}

async function getById(recipeId) {
  return Recipe.findById(recipeId).lean();
}

async function create(data, ownerId) {
  const record = new Recipe({
    title: data.title,
    ingredients: data.ingredients,
    instructions: data.instructions,
    description: data.description,
    image: data.image,
    owner: ownerId
  });

  await record.save();

  return record;
}

module.exports = {
  getRecent,
  getAll,
  getById,
  create
}