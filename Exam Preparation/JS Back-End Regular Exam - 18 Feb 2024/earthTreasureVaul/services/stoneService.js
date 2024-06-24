const Stone = require('../models/Stone');

const getLastStone = async () => Stone.find().sort({ _id: -1 }).limit(3).lean();

module.exports = {
    getLastStone
};