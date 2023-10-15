const Photo = require("../models/Photo");

const getAll = async () => Photo.find({}).populate('owner').lean();

const create = async (data) => Photo.create(data);

module.exports = {
  getAll,
  create,
};