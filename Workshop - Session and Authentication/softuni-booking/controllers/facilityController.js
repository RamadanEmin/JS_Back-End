const { hasRole } = require('../middlewares/guards');
const { createFacility } = require('../services/facilityService');

const facilityController = require('express').Router();
const { body, validationResult } = require('express-validator');
const { parseError } = require('../utils/parser');

facilityController.get('/create', hasRole('admin'), async(req, res) => {
    res.render('createFacility', {
        title: 'Create New Facility'
    });
});

facilityController.post('/create', hasRole('admin'),
    body('label')
    .trim()
    .notEmpty().withMessage('Label is required'),
    body('iconUrl').trim(),
    async(req, res) => {

        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                throw errors;
            }
            await createFacility(req.body.label, req.body.iconUrl);
            res.redirect('/catalog');
        } catch (error) {
            console.log(error);
            res.render('createFacility', {
                title: 'Create New Facility',
                error: parseError(error),
                body: req.body
            });
        }
    });

module.exports = facilityController;