const preload = require('../middlewares/preload');
const { createCourse } = require('../services/courseService');
const { parseError } = require('../util/parser');

const courseController = require('express').Router();

courseController.get('/create', (req, res) => {
    res.render('create', { title: 'Create Course' });
});

courseController.post('/create', async (req, res) => {
    const course = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        owner: req.user._id
    };

    try {
        await createCourse(course);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Course',
            errors,
            body: course,
        });
    }
});

courseController.get('/:id', preload(true), async (req, res) => {
    const course = res.locals.course;

    course.isOwner = course.owner.toString() === req.user._id.toString();
    course.enrolled = course.users.map(u => u.toString()).includes(req.user._id.toString());

    res.render('details', { title: course.title, course });
});

module.exports = courseController;