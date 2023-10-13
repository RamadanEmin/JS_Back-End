const Book = require('../models/Book');

const getAll = async () => Book.find({}).lean();

const getById = async (id) => Book.findById(id).lean();

const create = async (data) => Book.create(data);

module.exports = {
    getAll,
    getById,
    create,
};