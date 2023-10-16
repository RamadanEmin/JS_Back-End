const Game = require('../models/Game');

const create = async (data) => Game.create(data);

module.exports = {
    create,
};