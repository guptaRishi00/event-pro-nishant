import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
  Tag,
  DollarSign,
  CheckCircle,
} from "lucide-react";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/user/event-details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load event details");
        setLoading(false);
        console.error("Error fetching event:", err.message);
      }
    };

    fetchEvent();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:4000/user/register-event/${id}`,
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRegistrationSuccess(true);
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Error registering for event:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg shadow-md">
            <div className="text-red-700 dark:text-red-300 font-medium text-lg">
              {error}
            </div>
            <Link
              to="/events"
              className="mt-4 inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* Modern SVG Background */}
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
        {/* Event Header Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-800 dark:to-indigo-900 text-white py-6 mb-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Link
                    to="/events"
                    className="mr-4 flex items-center text-indigo-100 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 mr-1" />
                    Back
                  </Link>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-700 text-white">
                    {event.event.category}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {event.event.title}
                </h1>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                {event.event.isFree ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Free
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500 text-white">
                    <DollarSign className="w-4 h-4 mr-1" />${event.event.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Event Banner */}
            <div className="w-full h-72 bg-gray-300 dark:bg-gray-700 overflow-hidden">
              <img
                src={event.event.image || "/api/placeholder/1200/400"}
                alt={event.event.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/api/placeholder/1200/400";
                }}
              />
            </div>

            {/* Event Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Event Info */}
              <div className="lg:col-span-2 p-6 lg:p-8">
                {/* Event Meta */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center bg-indigo-50 dark:bg-indigo-900/30 px-3 py-2 rounded-md">
                    <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {event.event.date || "Date not specified"}
                    </span>
                  </div>
                  <div className="flex items-center bg-indigo-50 dark:bg-indigo-900/30 px-3 py-2 rounded-md">
                    <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {event.event.time || "Time not specified"}
                    </span>
                  </div>
                  <div className="flex items-center bg-indigo-50 dark:bg-indigo-900/30 px-3 py-2 rounded-md">
                    <Tag className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {event.event.category}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    About This Event
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {event.event.description}
                  </p>
                </div>

                {/* Location & Organizer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                      Location
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p className="mb-1">{event.event.location}</p>
                      <p>{event.event.city}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                      Organizer
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p className="mb-1">{event.event.organizer}</p>
                      <p className="flex items-center">
                        <Mail className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                        {event.event.organizerEmail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Sharing */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                    <Share2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                    Share This Event
                  </h3>
                  <div className="flex space-x-4">
                    <button className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                      <Facebook className="w-6 h-6" />
                    </button>
                    <button className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                      <Twitter className="w-6 h-6" />
                    </button>
                    <button className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                      <Linkedin className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Registration Form */}
              <div className="bg-gray-50 dark:bg-gray-700/30 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700">
                <div className="sticky top-24">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
                    Register for this event
                  </h3>

                  {registrationSuccess ? (
                    <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg mb-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-800 dark:text-green-300">
                            Registration successful!
                          </p>
                          <p className="mt-1 text-sm text-green-700 dark:text-green-400">
                            You'll receive a confirmation email shortly.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={userInfo.name}
                            onChange={handleInputChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Your full name"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={userInfo.email}
                            onChange={handleInputChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Phone
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={userInfo.phone}
                            onChange={handleInputChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        Register Now
                      </button>

                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {event.event.isFree
                          ? "This event is free to attend"
                          : `Registration fee: $${event.event.price}`}
                      </p>
                    </form>
                  )}

                  {/* Event Stats */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Event Type
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {event.event.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Capacity
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {event.event.capacity || "Unlimited"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Event Format
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {event.event.format || "In-person"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
