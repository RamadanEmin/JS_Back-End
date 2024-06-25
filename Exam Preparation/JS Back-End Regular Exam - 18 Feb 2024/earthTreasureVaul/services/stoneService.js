const Stone = require('../models/Stone');

const getLastStone = async () => Stone.find().sort({ _id: -1 }).limit(3).lean();

const getAll = async () => {
    return Stone.find(query).lean()
};

const getById = async (stoneId) => Stone.findById(stoneId).lean();

const create = async (data) => Stone.create(data);

const update = async (stoneId, data) => {
    const existing = await Stone.findById(stoneId);
    existing.name = data.name;
    existing.category = data.category;
    existing.color = data.color;
    existing.image = data.image;
    existing.location = data.location;
    existing.formula = data.formula;
    existing.description = data.description;

    existing.save();
};

const deleteById = async (stoneId) => Stone.findByIdAndDelete(stoneId);

module.exports = {
    getLastStone,
    getAll,
    getById,
    create,
    update,
    deleteById
};