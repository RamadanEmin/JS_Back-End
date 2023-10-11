const Crypto = require('../models/Crypto');

const getAll = async () =>  Crypto.find({}).lean();

const create = async (data) => Crypto.create(data);

const getById = async (id) => Crypto.findById(id).lean();

module.exports = {
    getAll,
    create,
    getById,
};