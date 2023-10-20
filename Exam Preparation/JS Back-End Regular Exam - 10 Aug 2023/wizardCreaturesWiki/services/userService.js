const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "q390vnodzmgszdfgsdz";

async function register(email, firstName, lastName, password) {
    const existing = await User.findOne({ email }).collation({
        locale: "en",
        strength: 2,
    });
    if (existing) {
        throw new Error("Email is taken!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        firstName,
        lastName,
        hashedPassword
    });

    const token = createSession(user);

    return token;
}

function createSession({ _id, email, firstName, lastName }) {
    const payload = {
        _id,
        email,
        firstName,
        lastName
    };

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    verifyToken
};
