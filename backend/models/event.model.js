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
    organizer: {
      type: String,
      required: true,
    },
    organizerEmail: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["concert", "conference", "sports", "workshop"],
      required: true,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Create and export the model
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
