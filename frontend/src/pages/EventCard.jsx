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

import { Link } from "react-router-dom";

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:4000/user/events");

      if (response.data && response.data.success) {
        // Correctly access the data array from the response
        setEvents(response.data.data);
      } else {
        setError(response.data?.message || "Failed to fetch events");
        setEvents([]);
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching events");
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    fetchEvents();
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Loading state with elegant animation
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-indigo-600"></div>
          <p className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium">
            Loading events...
          </p>
        </div>
      </div>
    );
  }

  // Error state with improved design
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-8 rounded-xl shadow-md max-w-lg mx-auto">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-8 h-8 mr-3" />
          <h3 className="text-xl font-bold">Unable to load events</h3>
        </div>
        <p className="mb-6 text-red-500 dark:text-red-300">{error}</p>
        <button
          onClick={handleRetry}
          className="flex items-center bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 text-red-600 dark:text-red-300 py-3 px-6 rounded-lg transition-colors font-medium"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  // Empty state - no events
  if (!events || events.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-10 text-center max-w-lg mx-auto">
        <Calendar className="w-20 h-20 mx-auto mb-6 text-indigo-500 opacity-70" />
        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
          No Events Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          There are no upcoming events at the moment. Check back later for
          exciting new events.
        </p>
        <button
          onClick={handleRetry}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg transition-colors flex items-center mx-auto"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Refresh
        </button>
      </div>
    );
  }

  // Normal state with events - enhanced design
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-indigo-950 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
          <Calendar className="w-8 h-8 mr-3 text-indigo-600" />
          Upcoming Events
        </h2>

        {/* Events Grid with improved cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={event._id || index}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col group"
              onMouseEnter={() => setActiveEvent(index)}
              onMouseLeave={() => setActiveEvent(null)}
            >
              {/* Event Image with gradient overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={event.image || "/api/placeholder/400/300"}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>

                {/* Tag/Badge with more vibrant design */}
                <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {event.category || "Event"}
                </div>

                {/* Free tag */}
                {event.isFree || event.price === 0 ? (
                  <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    FREE
                  </div>
                ) : null}

                {/* Title overlay with better positioning */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-2xl font-bold text-white drop-shadow-md">
                    {event.title}
                  </h3>
                </div>
              </div>

              {/* Event Content with improved typography */}
              <div className="p-6 flex-grow">
                <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-2">
                  {event.description}
                </p>

                {/* Event Details with improved styling */}
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                    <span>{formatDate(event.createdAt || event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                    <span>
                      {event.location}
                      {event.city ? `, ${event.city}` : ""}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Tag className="w-4 h-4 mr-2 text-green-500" />
                    <span>{event.category || "General"}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <User className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{event.organizer || "Event Organizer"}</span>
                  </div>
                </div>
              </div>

              {/* Event Footer with improved styling */}
              <div className="px-6 pb-4 pt-2 flex justify-between items-center border-t border-gray-100 dark:border-gray-700 mt-2">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-1 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
                    {event.isFree || event.price === 0
                      ? "Free"
                      : `$${parseFloat(event.price || 0).toFixed(2)}`}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Users className="w-5 h-5 mr-1" />
                  <span>{event.attendees || "0"} attendees</span>
                </div>
              </div>

              {/* Action Button with improved styling and animation */}
              <Link
                to={`/event-details/${event._id}`}
                className="w-full bg-indigo-600 lg:hover:bg-indigo-700 text-white text-center py-4 transition-colors flex items-center justify-center font-medium group hover:bg-indigo-500"
              >
                View Event Details
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
