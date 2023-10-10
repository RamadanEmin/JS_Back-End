const mongoose = require("mongoose");

const CONNECTION_STRING = "mongodb://localhost:27017/25-Jun-2022";

module.exports = async (app) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Databased connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
