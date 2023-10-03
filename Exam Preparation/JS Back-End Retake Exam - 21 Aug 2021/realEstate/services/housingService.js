const Housing = require('../models/Housing');

async function getRecent() {
    return Housing.find({}).sort({ createdAt: -1 }).limit(3).lean();
}

module.exports = {
    getRecent,
};