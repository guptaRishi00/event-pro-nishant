require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("Local file path is required");
    }

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // After the file is uploaded
    console.log("File uploaded to Cloudinary:", response.url);
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);

    // Remove the local file
    try {
      fs.unlinkSync(localFilePath);
      console.log("Temporary file deleted:", localFilePath);
    } catch (unlinkError) {
      console.error("Error deleting temporary file:", unlinkError.message);
    }

    return null;
  }
};

module.exports = { uploadOnCloudinary };
