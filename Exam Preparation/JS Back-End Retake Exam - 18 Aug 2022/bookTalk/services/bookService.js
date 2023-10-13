const Book = require('../models/Book');

const create = async (data) => Book.create(data);

module.exports = {
    create,
};