const Auction = require('../models/Auction');

const getAll = async () => Auction.find({}).lean();

const getById = async (id) => Auction.findById(id).populate('bidder').lean();

const create = async (data) => Auction.create(data);

module.exports = {
    getAll,
    getById,
    create,
};