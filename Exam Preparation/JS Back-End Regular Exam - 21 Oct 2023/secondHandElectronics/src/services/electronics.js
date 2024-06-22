const { Electronic } = require('../models/Electronics');

async function getAll() {
  return Electronic.find().lean();
}

async function getById(electronicId) {
  return Electronic.findById(electronicId).lean();
}

function getRecent() {
  return Electronic.find().sort({ $natural: -1 }).limit(3).lean();
}

async function create(data, ownerId) {
  const record = new Electronic({
    name: data.name,
    type: data.type,
    damages: data.damages,
    image: data.image,
    description: data.description,
    production: data.production,
    exploatation: data.exploatation,
    price: data.price,
    owner: ownerId
  });

  await record.save();

  return record;
}

module.exports = {
  getAll,
  getById,
  create,
  getRecent,
}