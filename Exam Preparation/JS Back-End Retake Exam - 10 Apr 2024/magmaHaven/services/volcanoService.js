const Volcano = require('../models/Volcano');

const getAll = async () => {
    return Volcano.find({}).lean()
};

const getById = async (volcanoId) => Volcano.findById(volcanoId).lean();

const create = async (data) => Volcano.create(data);

const vote = async (volcanoId, userId) => {
    const existing = await Volcano.findById(volcanoId);
    existing.voteList.push(userId);

    existing.save();
};

const update = async (volcanoId, data) => {
    const existing = await Volcano.findById(volcanoId);
    existing.name = data.name;
    existing.location = data.location;
    existing.elevation = data.elevation;
    existing.lastEruption = data.lastEruption;
    existing.image = data.image;
    existing.typeVolcano = data.typeVolcano;
    existing.description = data.description;

    existing.save();
};

const deleteById = async (volcanoId) => Volcano.findByIdAndDelete(volcanoId);

module.exports = {
    getAll,
    getById,
    create,
    vote,
    update,
    deleteById
};