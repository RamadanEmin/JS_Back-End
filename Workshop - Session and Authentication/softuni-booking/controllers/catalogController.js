const { getAll } = require('../services/roomService');

const router = require('express').Router();

router.get('/', async(req, res) => {

    const user = res.user;
    console.log(user);

    const search = req.query.search || '';
    const city = req.query.city || '';
    const fromPrice = Number(req.query.fromPrice) || 1;
    const toPrice = Number(req.query.toPrice) || 1000;

    const rooms = await getAll(search, city, fromPrice, toPrice);

    res.render('catalog', {
        title: 'All Accomodation',
        rooms,
        search,
        city,
        fromPrice,
        toPrice
    })
})

module.exports = router;