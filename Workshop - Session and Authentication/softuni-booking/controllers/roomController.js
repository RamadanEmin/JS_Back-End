const { getById, update } = require('../services/roomService');
const { parseError } = require('../utils/parser');

const roomController = require('express').Router();

roomController.get('/:id/edit', async(req, res) => {
    const roomId = req.params.id;
    const room = await getById(roomId);

    if (!req.user || room.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    res.render('edit', {
        title: 'Edit Accomodation',
        room
    });
});

roomController.post('/:id/edit', async(req, res) => {
    const roomId = req.params.id;

    const room = await getById(roomId);

    if (!req.user || room.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    try {
        const result = await update(roomId, req.body);

        res.redirect('/catalog/' + result._id);

    } catch (error) {
        req.body._id = roomId;
        res.render('edit', {
            title: 'Edit Accomodation',
            error: parseError(error),
            room: req.body
        });
    }
});

module.exports = roomController;