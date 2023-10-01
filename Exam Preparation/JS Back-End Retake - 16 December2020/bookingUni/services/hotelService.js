const Hotel = require('../models/Hotel');

async function getAll() {
    return Hotel.find({}).lean();
}

async function create(hotel) {
    return Hotel.create(hotel);
}

module.exports = {
    getAll,
    create,
};