const Creature = require('../models/Creature');

const create = async (data) => Creature.create(data);

module.exports = {
    create,
};