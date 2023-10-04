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

module.exports = {
    getRecent,
    getAll,
    createOffer,
};