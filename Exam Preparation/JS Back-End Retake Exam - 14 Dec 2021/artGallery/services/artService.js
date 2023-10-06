const Art = require('../models/Art');

async function getAll() {
    return Art.find({}).lean();
}

async function getById(id) {
    return Art.findById(id).populate('owner', 'username').lean();
}

async function createArt(art) {
    return Art.create(art);
}

module.exports = {
    getAll,
    getById,
    createArt,
};