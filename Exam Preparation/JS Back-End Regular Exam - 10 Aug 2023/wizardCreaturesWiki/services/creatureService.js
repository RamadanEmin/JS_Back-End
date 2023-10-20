const Creature = require('../models/Creature');

const getAll = async () => Creature.find({}).lean();

const getById = async (creatureId) => Creature.findById(creatureId).populate('owner', 'firstName lastName').populate('votes', 'email').lean();

const create = async (data) => Creature.create(data);

module.exports = {
    getAll,
    getById,
    create,
};