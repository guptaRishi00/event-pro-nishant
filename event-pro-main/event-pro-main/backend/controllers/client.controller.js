const clientModel = require("../models/client.model");

const clientRegister = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await clientModel.hashPassword(password);

  if (!hashedPassword) {
    throw new Error("Something went wrong in hashing password");
  }

  try {
    const client = await clientModel.create({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      passowrd: hashedPassword,
    });

    if (!client) {
      throw new Error("Something went wrong in registering client");
    }

    const token = client.generateToken();

    if (!token) {
      throw new Error("Something went wrong in token generation");
    }

    res.status(200).json({ token, client });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { clientRegister };
