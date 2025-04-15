const userModel = require("../models/user.model");
const eventModel = require("../models/event.model");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const clientRegister = async (req, res) => {
  const { name, email, password, phone, organization } = req.body;

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  try {
    const client = await userModel.create({
      name,
      email,
      password,
      userType: "client",
      phone: phone || "",
      organization: organization || "",
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

const postEvents = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      city,
      category,
      price,
      organizerEmail,
      organizer,
    } = req.body;

    console.log("Creating event for user:", req.user.email);
    console.log("Request body:", req.body);

    // Validate required fields based on your schema
    if (!title || !description || !location || !city || !category) {
      return res.status(400).json({
        success: false,
        message:
          "Title, Description, Location, City, and Category are required",
      });
    }

    // Handle image upload
    let imageUrl = "default-event.jpg";
    if (req.file?.path) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (!cloudinaryResponse?.secure_url) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload image to Cloudinary",
        });
      }
      imageUrl = cloudinaryResponse.secure_url;
    }

    // Create event with proper field names matching your schema
    const newEvent = await eventModel.create({
      title,
      description,
      location,
      city,
      category,
      price: price || 0,
      image: imageUrl,
      organizer: req.user.name,
      organizerEmail: req.user.email,
      user: req.user._id,
      isFree: price === 0,
    });

    console.log("Created event:", newEvent);

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Event creation error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const yourEvents = async (req, res) => {
  try {
    console.log("Fetching events for user:", req.user.email);
    const events = await eventModel.find({
      organizerEmail: req.user.email,
    });

    console.log("Found events:", events);

    res.status(200).json({
      success: true,
      count: events.length,
      events: events.map((event) => ({
        ...event.toObject(),
        isOrganizerClient: req.user.userType === "client",
      })),
    });
  } catch (error) {
    console.error("Error fetching user events:", error);
    res.status(500).json({
      success: false,
      message: "Server error while retrieving your events",
    });
  }
};

module.exports = { postEvents, clientRegister, yourEvents };
