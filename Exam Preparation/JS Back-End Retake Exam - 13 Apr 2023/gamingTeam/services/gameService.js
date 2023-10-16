const Game = require('../models/Game');

const getAll = async () => Game.find({}).lean();

const create = async (data) => Game.create(data);

module.exports = {
    getAll,
    create,
};