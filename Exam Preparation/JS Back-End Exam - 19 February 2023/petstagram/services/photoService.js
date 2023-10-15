const Photo = require("../models/Photo");

const getAll = async () => Photo.find({}).populate('owner').lean();

const getById = async (id) => Photo.findById(id).populate('owner').populate({
  path: 'commentList.userId',
  select: 'username'
}).lean();

const create = async (data) => Photo.create(data);

module.exports = {
  getAll,
  getById,
  create,
};