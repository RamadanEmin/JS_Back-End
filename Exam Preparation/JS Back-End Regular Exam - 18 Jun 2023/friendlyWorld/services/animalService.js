const Animal = require('../models/Animal');

const getLastAnimal = async () => Animal.find().sort({ _id: -1 }).limit(3).lean();

const getAll = async (search) => {
    const query = {}
    if (search) {
        query.location = new RegExp(search, 'i');
    }

    return Animal.find(query).lean()
};

const create = async (data) => Animal.create(data);

module.exports = {
    getLastAnimal,
    getAll,
    create,
};