const Book = require('../models/Book');

const getAll = async () => Book.find({}).lean();

const getById = async (id) => Book.findById(id).lean();

const create = async (data) => Book.create(data);

const update = async (id, data) => {
    const existing = await Book.findById(id);

    existing.title = data.title;
    existing.author = data.author;
    existing.genre = data.genre;
    existing.stars = data.stars;
    existing.image = data.image;
    existing.review = data.review;

    existing.save();
};

const deleteById = async (id) => Book.findByIdAndDelete(id);

const wishBook = async (bookId, userId) => {
    const book = await Book.findById(bookId);
    book.wishingList.push(userId);

    book.save();
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    wishBook,
};