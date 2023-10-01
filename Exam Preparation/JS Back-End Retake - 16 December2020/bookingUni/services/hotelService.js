const Hotel = require('../models/Hotel');

async function getAll() {
    return Hotel.find({}).lean();
}

async function getById(id) {
    return Hotel.findById(id).lean();
}

async function create(hotel) {
    return Hotel.create(hotel);
}

module.exports = {
    getAll,
    getById,
    create,
};