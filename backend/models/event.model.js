const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a simple event schema
const eventSchema = new Schema(
  {
    // Basic event information
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // Location details
    location: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    // Category for filtering events
    category: {
      type: String,
      required: true,
    },
    // Event image
    image: {
      type: String,
      default: "default-event.jpg",
    },
    // Price information
    price: {
      type: Number,
      default: 0,
    },
    // Organizer details
    organizer: {
      type: String,
      required: true,
    },
    organizerEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create and export the model
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
