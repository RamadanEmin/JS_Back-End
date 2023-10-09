const Auction = require('../models/Auction');

const create = async (data) => Auction.create(data);

module.exports = {
    create,
};