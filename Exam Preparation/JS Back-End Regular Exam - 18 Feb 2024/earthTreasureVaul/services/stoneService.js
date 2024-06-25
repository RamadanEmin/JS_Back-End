const Stone = require('../models/Stone');

const getLastStone = async () => Stone.find().sort({ _id: -1 }).limit(3).lean();

const getAll = async (search) => {
    const query = {}
    if (search) {
        query.name = new RegExp(search, 'i');
    }

    return Stone.find(query).lean()
};

const getById = async (stoneId) => Stone.findById(stoneId).lean();

const create = async (data) => Stone.create(data);

module.exports = {
    getLastStone,
    getAll,
    getById,
    create
};