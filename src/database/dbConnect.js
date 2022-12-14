const DATABASE_MONGO = process.env.DATABASE_MONGO;

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    mongoose.connect(DATABASE_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connect };
