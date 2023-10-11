const Crypto = require('../models/Crypto');

const getAll = async () =>  Crypto.find({}).lean();

const create = async (data) => Crypto.create(data);

module.exports = {
    getAll,
    create,
};