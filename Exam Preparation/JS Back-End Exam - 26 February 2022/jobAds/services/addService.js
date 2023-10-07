const Add = require('../models/Add');

const getAll = async (search, limit) => {
    const query = {};

    if (search) {
        query.authorEmail = new RegExp(search, 'i');
    }
    if (limit) {
        return Add.find(query).limit(limit).lean();
    }

    return Add.find(query).lean();
};

module.exports = {
    getAll,
};