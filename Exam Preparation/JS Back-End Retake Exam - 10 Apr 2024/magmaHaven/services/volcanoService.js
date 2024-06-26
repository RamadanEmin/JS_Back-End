const Volcano = require('../models/Volcano');

const getAll = async () => {
    return Volcano.find({}).lean()
};

module.exports = {
    getAll
};