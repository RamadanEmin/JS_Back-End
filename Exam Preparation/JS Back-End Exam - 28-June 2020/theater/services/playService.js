const Play = require('../models/Play');

async function getAllByLikes() {
    return Play.find({ isPublic: true }).sort({ likesCount: -1 }).limit(3).lean();
}

async function getAllByDate() {
    return Play.find({ isPublic: true }).sort({ createdAt: -1 }).lean();
}


module.exports = {
    getAllByLikes,
    getAllByDate,
}