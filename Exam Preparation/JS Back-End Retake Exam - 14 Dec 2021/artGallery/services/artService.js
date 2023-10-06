const Art = require('../models/Art');

async function getAll() {
    return Art.find({}).lean();
}

module.exports = {
    getAll,
};