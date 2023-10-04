const Housing = require('../models/Housing');

async function getRecent() {
    return Housing.find({}).sort({ createdAt: -1 }).limit(3).lean();
}

async function getAll(search) {
    const query = {};

    if (search) {
        query.type = new RegExp(search, 'i');
    }

    return Housing.find(query).lean();
}

async function createOffer(offer) {
    return Housing.create(offer);
}

async function getById(id) {
    return Housing.findById(id).populate('rented', 'fullName').lean();
}

module.exports = {
    getRecent,
    getAll,
    createOffer,
    getById,
};