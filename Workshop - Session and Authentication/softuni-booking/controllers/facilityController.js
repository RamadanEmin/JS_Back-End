const { hasRole } = require('../middlewares/guards');

const facilityController = require('express').Router();

facilityController.get('/create', hasRole('admin'), async(req, res) => {
    res.render('createFacility', {
        title: 'Create New Facility'
    });
});

module.exports = facilityController;