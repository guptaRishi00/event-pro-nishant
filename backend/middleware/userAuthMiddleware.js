const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Token extraction with multiple sources
    let token;
    const { authorization } = req.headers;

    if (authorization?.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // 2. Verify token with async/await
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        err ? reject(err) : resolve(decoded);
      });
    });

    // 3. Find user with fresh database data
    const user = await User.findById(decoded.id).select(
      "-password -__v -createdAt"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found",
      });
    }

    // 4. Validate token version
    if (user.tokenVersion !== decoded.tokenVersion) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    }

    // 5. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    // 6. Enhanced error handling
    let message = "Authentication failed";
    let statusCode = 401;

    if (error instanceof jwt.TokenExpiredError) {
      message = "Session expired. Please log in again.";
    } else if (error instanceof jwt.JsonWebTokenError) {
      message = "Invalid authentication token";
    } else {
      statusCode = 500;
      message = "Authentication processing failed";
    }

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

module.exports = authMiddleware;
