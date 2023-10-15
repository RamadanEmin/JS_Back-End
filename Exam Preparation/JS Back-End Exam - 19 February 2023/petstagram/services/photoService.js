const Photo = require("../models/Photo");

const getAll = async () => Photo.find({}).populate('owner').lean();

const getById = async (id) => Photo.findById(id).populate('owner').populate({
  path: 'commentList.userId',
  select: 'username'
}).lean();

const create = async (data) => Photo.create(data);

const update = async (id, data) => {
  const existing = await Photo.findById(id);

  existing.name = data.name;
  existing.image = data.image;
  existing.age = data.age;
  existing.description = data.description;
  existing.location = data.location;

  return existing.save();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};