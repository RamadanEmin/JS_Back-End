const Crypto = require('../models/Crypto');

const create = async (data) => Crypto.create(data);

module.exports = {
    create,
};