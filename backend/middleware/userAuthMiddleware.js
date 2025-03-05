const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const userAuthMiddleWare = async (req, res, next) => {
  try {
    let token =
      req.headers["authorization"]?.split(" ")[1] || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Authentication Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
module.exports = { userAuthMiddleWare };
