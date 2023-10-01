const hotelController = require('express').Router();

const { create, getById } = require('../services/hotelService');
const { parseError } = require('../util/parser');

hotelController.get('/create', (req, res) => {
    res.render('create', { title: 'Create Hotel' });
});

hotelController.post('/create', async (req, res) => {
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
        owner: req.user._id
    }

    try {
        if (Object.values(hotel).some(v => !v)) {
            throw new Error('All fields are required');
        }

        await create(hotel);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('create', {
            title: 'Create Hotel',
            body: hotel,
            errors: parseError(error)
        });
    }
});

hotelController.get('/:id/details', async (req, res) => {
    const hotel = await getById(req.params.id);

    if (hotel.owner == req.user._id) {
        hotel.isOwner = true;
    } else if (hotel.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
        hotel.isBooked = true;
    }

    res.render('details', { title: 'Hotel Details', hotel });
});

module.exports = hotelController;