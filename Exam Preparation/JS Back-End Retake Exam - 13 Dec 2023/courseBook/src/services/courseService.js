const { Course } = require('../models/Course');

async function getAll() {
  return Course.find().lean();
}

function getRecent() {
  return Course.find().sort({ _id: -1 }).limit(3).lean();
}

async function create(data, ownerId) {
  const record = new Course({
    title: data.title,
    type: data.type,
    certificate: data.certificate,
    image: data.image,
    description: data.description,
    price: data.price,
    owner: ownerId
  });

  await record.save();

  return record;
}

module.exports = {
  getAll,
  create,
  getRecent
}