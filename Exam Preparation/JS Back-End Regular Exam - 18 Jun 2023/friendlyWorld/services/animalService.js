const Animal = require('../models/Animal');

const getLastAnimal = async () => Animal.find().sort({ _id: -1 }).limit(3).lean();

const create = async (data) => Animal.create(data);

module.exports = {
    getLastAnimal,
    create,
};