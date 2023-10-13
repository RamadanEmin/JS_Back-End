const Book = require('../models/Book');

const getAll = async () => Book.find({}).lean();

const create = async (data) => Book.create(data);

module.exports = {
    getAll,
    create,
};