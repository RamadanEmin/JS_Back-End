const Course = require('../models/Course');

async function getAllByDate(search) {
    const query = {};
    if (search) {
        query.title = new RegExp(search, 'i');
    }

    return Course.find(query).sort({ createdAt: 1 }).lean();
}

async function getRecent() {
    return Course.find({}).sort({ userCount: -1 }).limit(3).lean();
}

async function getById(id) {
    return Course.findById(id).lean();
}

async function createCourse(course) {
    return Course.create(course);
}

module.exports = {
    getAllByDate,
    getRecent,
    getById,
    createCourse,
};