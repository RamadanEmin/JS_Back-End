const Trip = require('../models/Trip');

async function getAllTrips() {
    return Trip.find({}).lean();
}

module.exports = {
    getAllTrips,
};