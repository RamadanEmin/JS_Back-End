const router = require('express').Router();

const api = require('../services/furniture');

router.get('/', async (req, res) => {
    try {
        res.json(await api.getAll(req.query.where));
    } catch (err) {
        res.status(400).json({ message: 'Bad request' });
    }
});

module.exports = router;