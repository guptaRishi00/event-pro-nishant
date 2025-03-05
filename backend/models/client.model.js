const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  fullname: {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
      require: true,
    },
  },
});

clientSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

clientSchema.methods.generateToken = async function () {
  const token = await jwt.sign({ email: this.email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

clientSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const clientModel = mongoose.model("Client", clientSchema);

module.exports = clientModel;
