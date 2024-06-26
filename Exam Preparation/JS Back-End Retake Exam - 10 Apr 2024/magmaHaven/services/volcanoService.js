const Volcano = require('../models/Volcano');

const getAll = async () => {
    return Volcano.find({}).lean()
};

const create = async (data) => Volcano.create(data);

module.exports = {
    getAll,
    create
};