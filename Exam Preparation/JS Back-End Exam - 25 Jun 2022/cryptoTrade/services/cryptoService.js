const Crypto = require('../models/Crypto');

const getAll = async () =>  Crypto.find({}).lean();

const create = async (data) => Crypto.create(data);

const getById = async (id) => Crypto.findById(id).lean();

const update = async (id, data) => {
    const existing = await Crypto.findById(id);

    existing.name = data.name;
    existing.image = data.image;
    existing.price = data.price;
    existing.description = data.description;
    existing.payment = data.payment;

    existing.save();
};

module.exports = {
    getAll,
    create,
    getById,
    update,
};