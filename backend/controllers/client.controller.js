const clientModel = require("../models/client.model");
const eventModel = require("../models/event.model");
const { uploadOnCloudinary } = require("../utils/cloudinary");

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

const postEvents = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      city,
      category,
      price,
      organizer,
      organizerEmail,
    } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Handle optional image upload
    let eventPictureUrl = "default-event.jpg";
    if (req.file?.path) {
      const eventPicture = await uploadOnCloudinary(req.file.path);
      if (eventPicture) {
        eventPictureUrl = eventPicture.secure_url;
      }
    }

    // Save the event with the Cloudinary image URL
    const newEvent = await eventModel.create({
      title,
      description,
      date,
      time,
      location,
      city,
      category,
      price,
      organizer,
      organizerEmail,
      image: eventPictureUrl, // ✅ Use Cloudinary URL
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = { postEvents, clientRegister };
