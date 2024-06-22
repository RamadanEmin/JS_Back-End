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

async function update(electronicId, data, userId) {
  const record = await Electronic.findById(electronicId);

  if (!record) {
    throw new ReferenceError('Record not found!' + electronicId);
  }

  if (record.owner.toString() != userId) {
    throw new Error('Access Denied!');
  }

  record.name = data.name;
  record.type = data.type;
  record.damages = data.damages;
  record.image = data.image;
  record.description = data.description;
  record.production = data.production;
  record.exploatation = data.exploatation;
  record.price = data.price;

  await record.save();

  return record;
}

async function deleteById(electronicId, userId) {
  const record = await Electronic.findById(electronicId);

  if (!record) {
    throw new ReferenceError('Record not found!' + electronicId);
  }

  if (record.owner.toString() != userId) {
    throw new Error('Access Denied!');
  }

  await Electronic.findByIdAndDelete(electronicId);
}

module.exports = {
  getAll,
  getById,
  update,
  deleteById,
  create,
  getRecent
}