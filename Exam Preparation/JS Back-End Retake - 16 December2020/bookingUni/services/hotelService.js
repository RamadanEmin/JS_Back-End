const Hotel = require('../models/Hotel');

async function getAll() {
    return Hotel.find({}).lean();
}


module.exports = {
    getAll,
};