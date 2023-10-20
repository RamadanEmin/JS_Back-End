const Creature = require('../models/Creature');

const getAll = async () => Creature.find({}).lean();

const create = async (data) => Creature.create(data);

module.exports = {
    getAll,
    create,
};