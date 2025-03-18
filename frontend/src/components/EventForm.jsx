import React, { useState } from "react";
import axios from "axios";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    category: "",
    price: 0,
    organizer: "",
    organizerEmail: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    "Music",
    "Arts",
    "Business",
    "Conference",
    "Workshop",
    "Sports",
    "Food",
    "Charity",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.organizer.trim())
      newErrors.organizer = "Organizer name is required";

    if (!formData.organizerEmail.trim()) {
      newErrors.organizerEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.organizerEmail)) {
      newErrors.organizerEmail = "Email is invalid";
    }

    if (formData.price < 0) newErrors.price = "Price cannot be negative";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const eventFormData = new FormData();
      Object.keys(formData).forEach((key) => {
        eventFormData.append(key, formData[key]);
      });
      eventFormData.append(
        "path",
        formData.title.toLowerCase().replace(/\s+/g, "-")
      );

      if (imageFile) {
        eventFormData.append("picture", imageFile); // ✅ Corrected field name
      }

      // Debugging: Log FormData
      for (let pair of eventFormData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.post(
        "http://localhost:4000/client/post-event",
        eventFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Event created successfully:", response.data);
      setSubmitSuccess(true);
      setFormData({
        title: "",
        description: "",
        location: "",
        city: "",
        category: "",
        price: 0,
        organizer: "",
        organizerEmail: "",
      });
      setImageFile(null);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Create New Event
      </h1>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          Event created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe your event"
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Location and City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Venue or address"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="City name"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          {/* Category and Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0.00"
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          {/* Image */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              name="picture"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {imageFile && (
              <p className="mt-1 text-xs text-green-600">
                File selected: {imageFile.name}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Leave empty to use default image
            </p>
          </div>

          {/* Organizer Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organizer Name
            </label>
            <input
              type="text"
              name="organizer"
              value={formData.organizer}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.organizer ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your name or organization"
            />
            {errors.organizer && (
              <p className="mt-1 text-sm text-red-600">{errors.organizer}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organizer Email
            </label>
            <input
              type="email"
              name="organizerEmail"
              value={formData.organizerEmail}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.organizerEmail ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="email@example.com"
            />
            {errors.organizerEmail && (
              <p className="mt-1 text-sm text-red-600">
                {errors.organizerEmail}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition disabled:opacity-70"
          >
            {isSubmitting ? "Creating Event..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
