const Item = require('../models/Item');


async function getAll(query) {
    if (query) {
        const userId = query.split('=')[1].slice(1, -1);
        return Item.find({ _ownerId: userId });
    }
    return Item.find({});
}

async function create(item) {
    const result = new Item({
        make: item.make,
        model: item.model,
        year: item.year,
        description: item.description,
        price: item.price,
        img: item.img,
        material: item.material,
        _ownerId: item._ownerId
    });

    await result.save();

    return result;
}

async function getById(id) {
    return Item.findById(id);
}

module.exports = {
    getAll,
    create,
    getById,
};