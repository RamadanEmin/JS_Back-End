const Auction = require('../models/Auction');

const getAll = async () => Auction.find({}).lean();

const create = async (data) => Auction.create(data);

module.exports = {
    getAll,
    create,
};