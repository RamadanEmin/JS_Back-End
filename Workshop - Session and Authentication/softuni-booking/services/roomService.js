const Room = require('../models/Room')

function getAll(search, city, fromPrice, toPrice) {
    return Room.find({}).lean();
}

async function create(roomData, ownerId) {
    const room = {
        name: roomData.name,
        description: roomData.description,
        city: roomData.city,
        beds: Number(roomData.beds),
        price: Number(roomData.price),
        imgURL: roomData.imgURL,
        owner: ownerId
    }

    const missing = Object.entries(room).filter(([k, v]) => !v);
    if (missing.length > 0) {
        throw new Error(missing.map(m => `${m[0]} is required`).join('\n'));
    }

    const result = await Room.create(room);

    return result;
}

module.exports = {
    getAll,
    create
};