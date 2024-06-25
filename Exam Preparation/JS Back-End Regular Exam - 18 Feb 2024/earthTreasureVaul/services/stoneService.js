const Stone = require('../models/Stone');

const getLastStone = async () => Stone.find().sort({ _id: -1 }).limit(3).lean();

const getAll = async () => {
    return Stone.find().lean()
};

const create = async (data) => Stone.create(data);

module.exports = {
    getLastStone,
    getAll,
    create
};