const { hasUser } = require("../middlewares/guards");
const { createOffer, getById, updateById, deleteById, rentHousing } = require("../services/housingService");
const { parseError } = require("../util/parser");

const housingController = require("express").Router();

housingController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create Offer' });
});

housingController.post('/create', hasUser(), async (req, res) => {
    const offer = {
        name: req.body.name,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        image: req.body.image,
        propertyDescription: req.body.propertyDescription,
        availablePieces: req.body.availablePieces,
        owner: req.user
    };

    try {
        await createOffer(offer);
        res.redirect('/housings');
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render("create", {
            title: "Create Offer",
            errors,
            body: offer
        });
    }
});

module.exports = housingController;