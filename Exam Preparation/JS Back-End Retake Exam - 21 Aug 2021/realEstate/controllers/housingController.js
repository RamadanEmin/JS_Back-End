const { hasUser } = require("../middlewares/guards");
const { createOffer, getById } = require("../services/housingService");
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

housingController.get('/:id', async (req, res) => {
    const housing = await getById(req.params.id);

    if (req.user) {
        housing.isOwner = housing.owner.toString() === req.user._id.toString();
        housing.isRented = housing.rented.map(r => r.fullName).includes(req.user.fullName.toString());
        housing.rentedStr = housing.rented.map(r => r.fullName).join(', ');
    }

    res.render('details', { title: housing.name, housing });
});

module.exports = housingController;