const Animal = require('../models/Animal');

const getLastAnimal = async () => Animal.find().sort({ _id: -1 }).limit(3).lean();

const getAll = async (search) => {
    const query = {}
    if (search) {
        query.location = new RegExp(search, 'i');
    }

    return Animal.find(query).lean()
};

const getById = async (animalId) => Animal.findById(animalId).lean();

const create = async (data) => Animal.create(data);

const update = async (animalId, data) => {
    const existing = await Animal.findById(animalId);
    existing.name = data.name;
    existing.years = data.years;
    existing.kind = data.kind;
    existing.image = data.image;
    existing.need = data.need;
    existing.location = data.location;
    existing.description = data.description;

    existing.save();
};

module.exports = {
    getLastAnimal,
    getAll,
    getById,
    create,
    update,
};