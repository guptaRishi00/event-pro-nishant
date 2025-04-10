const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Event = require("../models/event.model");

exports.userRegister = async (req, res) => {
  const { name, email, password, userType, phone, organization } = req.body;

  // Add enum validation
  if (!["user", "client"].includes(userType)) {
    return res.status(400).json({ message: "Invalid user type" });
  }

  // Create user with correct type
  const user = await User.create({
    name,
    email,
    password,
    userType, // Use validated userType
    phone,
    organization: userType === "client" ? organization : undefined,
  });
};

// Log in a user
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user with password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT with expiration
    const token = user.generateToken();

    // Sanitize user object
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // Set token in HTTP-only cookie (optional)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      token, // Optional if using cookies
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during authentication",
    });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        ...user.toObject(),
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const { category, city, page = 1, limit = 10 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (city) query.city = new RegExp(city, "i");

    const events = await Event.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("organizer", "name email");

    const count = await Event.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve events",
    });
  }
};
