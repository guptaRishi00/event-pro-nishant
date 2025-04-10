import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

// Import Lucide icons for better visual appeal
import {
  Calendar,
  MapPin,
  Users,
  Music,
  Mail,
  Phone,
  Search,
  Bell,
  TrendingUp,
  Filter,
} from "lucide-react";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user from Redux store (integrating with Navbar's auth state)
  const { user } = useSelector((state) => state.auth);

  // Fetch events from the API using axios
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4000/user/events");
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();
  }, []);

  const features = [
    {
      icon: <Calendar className="w-12 h-12 text-blue-500" />,
      title: "Easy Booking",
      description: "Seamless event registration and ticket purchasing",
    },
    {
      icon: <Users className="w-12 h-12 text-green-500" />,
      title: "Community",
      description: "Connect with event enthusiasts and make new friends",
    },
    {
      icon: <Music className="w-12 h-12 text-purple-500" />,
      title: "Diverse Events",
      description: "Wide range of events from concerts to conferences",
    },
  ];

  const stats = [
    {
      label: "Events This Month",
      value: "125+",
      icon: <Calendar className="w-8 h-8 text-indigo-500" />,
    },
    {
      label: "Active Users",
      value: "15.4K",
      icon: <Users className="w-8 h-8 text-green-500" />,
    },
    {
      label: "Ticket Sales",
      value: "$1.2M",
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
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

          {/* Background shapes */}
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
          <rect
            width="100%"
            height="100%"
            fill="url(#heroGradient)"
            opacity="0.5"
          />

          {/* Decorative geometric shapes */}
          <circle cx="10%" cy="20%" r="200" fill="rgba(99, 102, 241, 0.05)" />
          <circle cx="90%" cy="80%" r="250" fill="rgba(79, 70, 229, 0.05)" />
        </svg>
      </div>

      {/* Main Content - Positioned relatively */}
      <div className="relative z-10 pt-16">
        {" "}
        {/* Add pt-16 to account for fixed navbar */}
        {/* User Welcome Banner */}
        {user && (
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-800 dark:to-indigo-900 text-white py-6 mb-8">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">
                    Welcome back,{" "}
                    {user?.response?.email
                      ? user.response.email.split("@")[0]
                      : "User"}
                    !
                  </h1>
                  <p className="text-indigo-100">
                    Discover today's trending events
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="relative p-2 rounded-full bg-indigo-700 hover:bg-indigo-800 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                      3
                    </span>
                  </button>
                  <Link
                    to="/profile"
                    className="py-2 px-4 bg-white text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
                  >
                    My Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Search and Filter Bar */}
        <div className="container mx-auto mb-12 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <div className="relative flex-grow mb-4 md:mb-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for events..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </button>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {filterOpen && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white">
                    <option value="">All Categories</option>
                    <option value="music">Music</option>
                    <option value="tech">Technology</option>
                    <option value="food">Food & Drinks</option>
                    <option value="arts">Arts & Culture</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date Range
                  </label>
                  <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white">
                    <option value="">Anytime</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price Range
                  </label>
                  <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white">
                    <option value="">Any Price</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Stats Section */}
        <section className="container mx-auto mb-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center space-x-4 transform transition-all hover:scale-105"
              >
                <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Featured Events Section */}
        <section className="container mx-auto py-12 px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Featured Events
            </h2>
            <Link
              to="/events"
              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium flex items-center"
            >
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event._id || event.id}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl relative z-20 flex flex-col"
                    onMouseEnter={() => setActiveSection(event._id || event.id)}
                    onMouseLeave={() => setActiveSection(null)}
                  >
                    <div className="relative">
                      <img
                        src={event.image || "/api/placeholder/400/250"}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "/api/placeholder/400/250";
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {event.category}
                      </div>
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        {event.price}
                      </span>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        <span>
                          {event.attending
                            ? event.attending.toLocaleString()
                            : "0"}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/events/${event._id || event.id}`}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-center py-3 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-span-4 text-center py-12">
                  <h3 className="text-xl text-gray-600 dark:text-gray-400">
                    No events found
                  </h3>
                </div>
              )}
            </div>
          )}
        </section>
        {/* Features Section */}
        <section className="bg-white dark:bg-gray-800 py-16 relative z-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Why Choose EventPro?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md transform transition-all hover:scale-105"
                >
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Newsletter Section */}
        <section className="bg-indigo-600 dark:bg-indigo-800 text-white py-16 relative z-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter and never miss an event that matches
              your interests
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l-lg sm:rounded-r-none mb-2 sm:mb-0 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button className="bg-indigo-800 hover:bg-indigo-900 text-white px-6 py-3 rounded-r-lg sm:rounded-l-none font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section className="container mx-auto py-16 px-4 relative z-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-blue-500" />
              <span className="ml-4 text-gray-700 dark:text-gray-300">
                support@eventpro.com
              </span>
            </div>
            <div className="flex items-center mb-6">
              <Phone className="w-6 h-6 text-green-500" />
              <span className="ml-4 text-gray-700 dark:text-gray-300">
                +1 (555) 123-4567
              </span>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 relative z-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div>
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-indigo-600 text-white font-bold text-xl mr-2">
                    EP
                  </div>
                  <span className="text-xl font-bold">EventPro</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Your gateway to incredible experiences and unforgettable
                  moments.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/events"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/events/music"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Music
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/events/tech"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Technology
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/events/food"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Food & Drinks
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/events/arts"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Arts & Culture
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/terms"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cookies"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/refunds"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Refund Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} EventPro. All rights reserved.
              </p>
              <p className="text-sm mt-2">
                Designed and developed with{" "}
                <span className="text-red-500">❤</span> for event enthusiasts.
              </p>
            </div>
          </div>
        </footer>
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

export default Dashboard;
