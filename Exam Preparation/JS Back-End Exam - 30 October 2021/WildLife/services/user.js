const User = require('../models/User');
const { hash } = require('bcrypt');

async function register(firstName, lastName, email, password) {
    const existing = await getUserByEmail(email);

    if (existing) {
        throw new Error('Email is taken');
    }

    const hashedPassword = await hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword
    });

    return user;
}

async function getUserByEmail(email) {
    const user = User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    return user;
}

module.exports = {
    register
};