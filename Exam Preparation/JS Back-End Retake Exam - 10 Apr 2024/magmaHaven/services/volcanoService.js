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

module.exports = {
    getAll,
    getById,
    create,
    vote
};