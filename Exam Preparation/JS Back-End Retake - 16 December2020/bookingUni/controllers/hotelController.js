const hotelController = require('express').Router();

const { create } = require('../services/hotelService');
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

module.exports = hotelController;