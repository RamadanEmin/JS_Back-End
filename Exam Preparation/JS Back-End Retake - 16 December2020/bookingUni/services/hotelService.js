const Hotel = require('../models/Hotel');

async function getAll() {
    return Hotel.find({}).lean();
}

async function getById(id) {
    return Hotel.findById(id).lean();
}

async function create(hotel) {
    return Hotel.create(hotel);
}

async function update(hotelId, hotel) {
    const existing = await Hotel.findById(hotelId);

    existing.name = hotel.name;
    existing.city = hotel.city;
    existing.imageUrl = hotel.imageUrl;
    existing.rooms = hotel.rooms;

    await existing.save();
}

async function deleteById(hotelId) {
    await Hotel.findByIdAndDelete(hotelId);
}

async function bookRoom(hotelId, userId) {
    const hotel = await Hotel.findById(hotelId);

    hotel.bookings.push(userId);
    await hotel.save();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    bookRoom
};