const { hasUser } = require('../middlewares/guards');
const { create } = require('../services/volcanoService');
const { parseError } = require('../util/parser');

const volcanoController = require('express').Router();

volcanoController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

volcanoController.post('/create', hasUser(), async (req, res) => {
    const volcano = {
        name: req.body.name,
        location: req.body.location,
        elevation: req.body.elevation,
        lastEruption: req.body.lastEruption,
        image: req.body.image,
        typeVolcano: req.body.typeVolcano,
        description: req.body.description,
        owner: req.user._id
    };

    try {
        await create(volcano);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            errors,
            volcano
        });
    }
});

module.exports = volcanoController;