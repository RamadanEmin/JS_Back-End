const Facility = require('../models/Facility');

async function createFacility(label, iconUrl) {
    return Facility.create({
        label,
        iconUrl
    })
}

module.exports = {
    createFacility,
}