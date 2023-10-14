const Photo = require("../models/Photo");

const create = async (data) => Photo.create(data);

module.exports = {
  create,
};