const Auction = require('../models/Auction');

const getAll = async () => Auction.find({}).lean();

const getById = async (id) => Auction.findById(id).populate('bidder').lean();

const create = async (data) => Auction.create(data);

const update = async (id, data) => {
    const existing = await Auction.findById(id);

    existing.title = data.title;
    existing.description = data.description;
    existing.category = data.category;
    existing.imageUrl = data.imageUrl;
    existing.price = data.price;

    return existing.save();
};

module.exports = {
    getAll,
    getById,
    create,
    update,
};