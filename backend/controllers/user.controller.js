const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

module.exports.userRegister = async (req, res) => {
  const { email, password, fullname } = req.body;

  if (!email || !password || !fullname) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(400).json({ message: "user already exists" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  try {
    const user = await userModel.create({
      email,
      password: hashedPassword,
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    });

    const token = await user.generateToken();

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid emial or password" });
    }

    const token = await user.generateToken();

    res.cookie("token", token);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

module.exports.getProfile = async (req, res) => {
  const user = req.user;

  try {
    const response = await userModel.findOne({ email: user.email });

    if (!response) {
      return res.status(401).json({ message: "Invalid token or user" });
    }

    res.status(200).json({ response });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
