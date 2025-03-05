const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("Error connecting to DB", err.message);
    });
}
module.exports = connectToDb;
