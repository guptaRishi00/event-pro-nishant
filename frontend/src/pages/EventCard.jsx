import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  MapPin,
  Users,
  Tag,
  User,
  DollarSign,
  Clock,
  ChevronRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchEvents = () => {
    setIsLoading(true);
    setError(null);

    axios
      .get("http://localhost:4000/user/events")
      .then((response) => {
        if (response.data && response.data.response) {
          setEvents(response.data.response);
        } else {
          // Handle case where response exists but doesn't have expected format
          setEvents([]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
        setEvents([]); // Ensure events is empty on error
      });
  };

  useEffect(() => {
    fetchEvents();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-6 h-6 mr-2" />
          <h3 className="text-lg font-semibold">Error loading events</h3>
        </div>
        <p className="mb-4">{error}</p>
        <button
          onClick={handleRetry}
          className="flex items-center bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 text-red-600 dark:text-red-300 py-2 px-4 rounded-md transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </button>
      </div>
    );
  }

  // Empty state - no events
  if (!events || events.length === 0) {
    return (
      <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
        {/* Background pattern */}
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
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-indigo-600" />
            Upcoming Events
          </h2>

          {/* Filter chips still visible even when no events */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors">
              All Events
            </button>
            <button className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              This Week
            </button>
            <button className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Free Events
            </button>
            <button className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Premium
            </button>
          </div>

          {/* Enhanced Empty State */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 text-center max-w-lg mx-auto">
            <Calendar className="w-20 h-20 mx-auto mb-6 text-indigo-500 opacity-70" />
            <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
              No Events Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              There are no upcoming events at the moment. Check back later or
              try different search criteria.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleRetry}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition-colors flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-6 rounded-lg transition-colors">
                Browse Categories
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal state with events
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
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
          <Calendar className="w-8 h-8 mr-3 text-indigo-600" />
          Upcoming Events
        </h2>

        {/* Filter chips could go here */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors">
            All Events
          </button>
          <button className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            This Week
          </button>
          <button className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Free Events
          </button>
          <button className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Premium
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              onMouseEnter={() => setActiveEvent(index)}
              onMouseLeave={() => setActiveEvent(null)}
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image || "/api/placeholder/400/300"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {event.category}
                </div>
                {event.price === "0.00" ? (
                  <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                    FREE
                  </div>
                ) : null}
              </div>

              {/* Event Content */}
              <div className="p-5 flex-grow">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {event.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                    <span>{event.date || "Date TBA"}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                    <span>
                      {event.location}, {event.city}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Tag className="w-4 h-4 mr-2 text-green-500" />
                    <span>{event.category}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <User className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{event.organizer}</span>
                  </div>
                </div>
              </div>

              {/* Event Footer */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    ${parseFloat(event.price).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{event.attendees || "0"}</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-center py-3 transition-colors flex items-center justify-center">
                View Details
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition-colors">
            Load More Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
