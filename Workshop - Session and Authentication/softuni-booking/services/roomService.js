const Room = require('../models/Room')

function getAll(search, city, fromPrice, toPrice) {
    return Room.find({}).lean();
}

module.exports = {
    getAll,
};