const Play = require('../models/Play');

async function createPlay(play) {
    return Play.create(play);
}

async function getById(id) {
    return Play.findById(id).lean();
}

async function getByIdRaw(id) {
    return Play.findById(id);
}

async function updatePlay(play, data) {
    play.title = data.title;
    play.description = data.description;
    play.imageUrl = data.imageUrl;
    play.isPublic = !!data.isPublic;

    return play.save();
}

async function getAllByLikes() {
    return Play.find({ isPublic: true }).sort({ likesCount: -1 }).limit(3).lean();
}

async function getAllByDate() {
    return Play.find({ isPublic: true }).sort({ createdAt: -1 }).lean();
}

module.exports = {
    createPlay,
    getById,
    getByIdRaw,
    getAllByLikes,
    getAllByDate,
    updatePlay,
}