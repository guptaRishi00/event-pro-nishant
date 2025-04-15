import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  MapPin,
  User,
  Tag,
  DollarSign,
  Mail,
  Phone,
} from "lucide-react";

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);

  // Get user from Redux store
  const { user } = useSelector((state) => state.auth);

  const token = localStorage.getItem("token");

  // Fetch registered events from the API using axios
  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/user/registered-events",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEvents(response.data.events);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Failed to fetch registered events:", err);
      }
    };

    fetchRegisteredEvents();
  }, []);

  console.log(events);

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Background pattern similar to Dashboard */}
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
      <div className="relative z-10 pt-16">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-800 dark:to-indigo-900 text-white py-8 mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">My Registered Events</h1>
            <p className="text-indigo-100">
              Manage and track events you've registered for
            </p>
          </div>
        </div>

        {/* Events List Section */}
        <section className="container mx-auto py-8 px-4">
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
          ) : events.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <div className="mb-4">
                <Calendar className="w-16 h-16 mx-auto text-indigo-500 opacity-50" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                No Registered Events
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You haven't registered for any events yet.
              </p>
              <Link
                to="/events"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
              >
                Browse Events
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {events.map((registration) => {
                const event = registration.eventId;
                return (
                  <div
                    key={registration._id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all hover:shadow-lg"
                    onMouseEnter={() => setActiveEvent(registration._id)}
                    onMouseLeave={() => setActiveEvent(null)}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/4">
                        <img
                          src={event.image || "/api/placeholder/400/250"}
                          alt={event.title}
                          className="w-full h-48 md:h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/api/placeholder/400/250";
                          }}
                        />
                      </div>
                      <div className="p-6 md:w-3/4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                              {event.title}
                            </h2>
                            <div className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-semibold px-2 py-1 rounded mb-3">
                              {event.category}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                              {event.description}
                            </p>
                          </div>
                          {event.price === 0 ? (
                            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                              Free
                            </span>
                          ) : (
                            <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded font-semibold">
                              ${event.price}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>
                              {event.location}, {event.city}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <User className="w-4 h-4 mr-2" />
                            <span>Organizer: {event.organizer}</span>
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Mail className="w-4 h-4 mr-2" />
                            <span>{event.organizerEmail}</span>
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>{registration.phone}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 md:gap-4 mt-3">
                          <Link
                            to={`/events/${event._id}`}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors inline-flex items-center"
                          >
                            View Details
                          </Link>
                          <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded transition-colors">
                            Contact Organizer
                          </button>
                          <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 px-4 py-2 rounded transition-colors">
                            Cancel Registration
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section className="container mx-auto py-12 px-4 relative z-20">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Need Help With Your Registration?
          </h2>
          <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Mail className="w-5 h-5 text-blue-500" />
              <span className="ml-3 text-gray-700 dark:text-gray-300">
                support@eventpro.com
              </span>
            </div>
            <div className="flex items-center mb-6">
              <Phone className="w-5 h-5 text-green-500" />
              <span className="ml-3 text-gray-700 dark:text-gray-300">
                +1 (555) 123-4567
              </span>
            </div>
            <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Contact Support
            </button>
          </div>
        </section>

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
    </div>
  );
};

export default RegisteredEvents;
