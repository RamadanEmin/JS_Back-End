const Art = require('../models/Art');

async function getAll() {
    return Art.find({}).lean();
}

async function createArt(art) {
    return Art.create(art);
}

module.exports = {
    getAll,
    createArt,
};