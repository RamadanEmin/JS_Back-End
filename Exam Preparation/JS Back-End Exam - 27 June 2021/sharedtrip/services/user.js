const User = require('../models/User');
const { hash } = require('bcrypt');

async function register(email, password,gender) {
    const existing = await getUserByEmail(email);

    if (existing) {
        throw new Error('Email is taken');
    }

    const hashedPassword = await hash(password, 10);

    const user = await User.create({
        email,
        hashedPassword,
        gender
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