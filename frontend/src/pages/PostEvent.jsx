import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Tag,
  DollarSign,
  Image,
  User,
  Mail,
  Info,
  Save,
  ArrowLeft,
  Upload,
  MapPin,
  X,
} from "lucide-react";

const PostEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    category: "",
    price: 0,
    organizer: "",
    organizerEmail: "",
    isFree: false,
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "price"
          ? Number(value)
          : value,
    }));
  };

  // Simplified image upload handling - no preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Clear image selection
  const clearImage = () => {
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setError(null);
    const token = localStorage.getItem("token");
    try {
      // Create a FormData object for multipart/form-data submission (for file upload)
      const eventFormData = new FormData();

      // Append all form fields to the FormData
      Object.keys(formData).forEach((key) => {
        eventFormData.append(key, formData[key]);
      });

      // Append the image file if one was selected
      if (imageFile) {
        eventFormData.append("picture", imageFile);
      }

      // We assume the API endpoint for posting events
      const response = await axios.post(
        "http://localhost:4000/client/post-event",
        eventFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Include authorization if your API requires it
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setSuccess(true);
      setLoading(false);

      // Reset form or redirect after success
      setTimeout(() => {
        navigate("/events");
      }, 2000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to create event. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Background SVG similar to Dashboard */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          className="absolute"
        >
          <defs>
            <pattern
              id="gridPattern"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 0 L80 0 L80 80 L0 80 Z"
                fill="none"
                stroke="rgba(99, 102, 241, 0.1)"
                strokeWidth="1"
              />
              <path
                d="M0 0 L80 80"
                stroke="rgba(99, 102, 241, 0.1)"
                strokeWidth="1"
              />
              <path
                d="M80 0 L0 80"
                stroke="rgba(99, 102, 241, 0.1)"
                strokeWidth="1"
              />
            </pattern>
            <linearGradient
              id="heroGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(79, 70, 229, 0.1)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
          <rect
            width="100%"
            height="100%"
            fill="url(#heroGradient)"
            opacity="0.5"
          />
          <circle cx="10%" cy="20%" r="200" fill="rgba(99, 102, 241, 0.05)" />
          <circle cx="90%" cy="80%" r="250" fill="rgba(79, 70, 229, 0.05)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-16 pb-16">
        <div className="container mx-auto px-4">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-800 dark:to-indigo-900 text-white py-6 mb-8 rounded-lg">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Create New Event</h1>
                  <p className="text-indigo-100">
                    Share your event with the community
                  </p>
                </div>
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center py-2 px-4 bg-white text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            {success && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline">
                  {" "}
                  Your event has been created. Redirecting...
                </span>
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter event title"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter event description"
                  className="w-full p-2 rounded border"
                />
              </div>

              {/* Two column layout for location and city */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Event venue"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white appearance-none"
                  >
                    <option value="">Select Category</option>
                    <option value="concert">Concert</option>
                    <option value="conference">Conference</option>
                    <option value="sports">Sports</option>
                    <option value="workshop">Workshop</option>
                  </select>
                </div>
              </div>

              {/* Simplified Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Event Image
                </label>

                {/* Simple file input with button */}
                <div className="flex items-center space-x-2">
                  <label className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded cursor-pointer hover:bg-indigo-100">
                    <Upload className="w-4 h-4 mr-2" />
                    <span>{imageFile ? "Change Image" : "Select Image"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  {imageFile && (
                    <button
                      type="button"
                      onClick={clearImage}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 flex items-center"
                    >
                      <X className="w-4 h-4 mr-1" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                {/* File name display instead of preview */}
                {imageFile && (
                  <p className="text-sm text-gray-500 mt-1">
                    Selected: {imageFile.name}
                  </p>
                )}

                {/* Simple help text */}
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: PNG, JPG, or GIF (max 2MB)
                </p>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    // disabled={formData.isFree}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="mt-2 flex items-center">
                  <input
                    type="checkbox"
                    id="isFree"
                    name="isFree"
                    checked={formData.isFree}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isFree"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    This is a free event
                  </label>
                </div>
              </div>

              {/* Two column layout for organizer info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Organizer Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="organizer"
                      required
                      value={formData.organizer}
                      onChange={handleChange}
                      placeholder="Your name or organization"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Organizer Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="organizerEmail"
                      required
                      value={formData.organizerEmail}
                      onChange={handleChange}
                      placeholder="Contact email"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-indigo-600 text-white py-2 px-4 rounded ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-indigo-700"
                  }`}
                >
                  {loading ? "Submitting..." : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default PostEvent;
