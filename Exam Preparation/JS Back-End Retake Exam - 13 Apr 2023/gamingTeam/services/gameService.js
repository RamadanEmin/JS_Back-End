const Game = require('../models/Game');

const getAll = async () => Game.find({}).lean();

const getById = async (gameId) => Game.findById(gameId).lean();

const create = async (data) => Game.create(data);

module.exports = {
    getAll,
    getById,
    create,
};