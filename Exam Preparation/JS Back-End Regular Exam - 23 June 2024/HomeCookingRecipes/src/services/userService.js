const { User } = require('../models/User');
const bcrypt = require('bcrypt');

const identityName = 'email';
async function register(identity, password, username) {
    const existing = await User.findOne({ [identityName]: identity });

    if (existing) {
        throw new Error(`This  ${identityName} is  already in use`);
    }

    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
        throw new Error(`This  ${username} is  already in use`);
    }

    const user = new User({
        [identityName]: identity,
        password: await bcrypt.hash(password, 10),
        username: username
    });

    await user.save();

    return user;
}

module.exports = {
    register
};