const Volcano = require('../models/Volcano');

const getAll = async () => {
    return Volcano.find({}).lean()
};

const getById = async (volcanoId) => Volcano.findById(volcanoId).lean();

const create = async (data) => Volcano.create(data);

module.exports = {
    getAll,
    getById,
    create
};