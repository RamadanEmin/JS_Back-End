const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "q390vnodzmgszdfgsdz";

async function register(fullName, username, password) {
  const existing = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });
  if (existing) {
    throw new Error("Username is taken!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    username,
    hashedPassword,
  });

  const token = createSession(user);

  return token;
}

function createSession({ _id, username, fullName }) {
  const payload = {
    _id,
    username,
    fullName
  };

  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  register,
  verifyToken,
};
