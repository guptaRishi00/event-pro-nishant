import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Tag,
  DollarSign,
  Clock,
  Edit,
  Trash2,
  Plus,
  AlertCircle,
  RefreshCw,
  Clipboard,
  Filter,
  ChevronRight,
  Check,
} from "lucide-react";

function YourEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the user token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login if not authenticated
      navigate("/login");
      return;
    }

    const fetchUserEvents = async () => {
      try {
        setLoading(true);

        // Fetch events organized by the logged-in user
        const response = await axios.get(
          "http://localhost:4000/client/your-events",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEvents(response.data.events);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch your events. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, [navigate, retryCount]);

  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`http://localhost:4000/client/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted event from state
      setEvents(events.filter((event) => event._id !== eventId));
      setShowDeleteModal(false);
    } catch (err) {
      setError("Failed to delete event. Please try again.");
    }
  };

  const confirmDelete = (eventId) => {
    setEventToDelete(eventId);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setEventToDelete(null);
    setShowDeleteModal(false);
  };

  const handleRetry = () => {
    setError(null);
    setRetryCount((prev) => prev + 1);
  };

  // Filter events based on selected filter
  const filteredEvents = () => {
    if (filter === "all") return events;

    switch (filter) {
      case "free":
        return events.filter((event) => event.isFree || event.price === 0);
      case "premium":
        return events.filter((event) => !event.isFree && event.price > 0);
      case "workshop":
        return events.filter((event) => event.category === "workshop");
      case "concert":
        return events.filter((event) => event.category === "concert");
      case "conference":
        return events.filter((event) => event.category === "conference");
      case "sports":
        return events.filter((event) => event.category === "sports");
      default:
        return events;
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="flex flex-col items-center p-8 rounded-lg">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading your events...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center p-4">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg shadow-md max-w-md w-full">
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
      </div>
    );
  }

  const displayEvents = filteredEvents();

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

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full m-4 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this event? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEvent(eventToDelete)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Your Events
            </h1>
          </div>

          <button
            onClick={() => navigate("/create-event")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Event
          </button>
        </div>

        {/* Filter chips */}
        <div className="mb-8">
          <div className="flex items-center mb-3 text-gray-700 dark:text-gray-300">
            <Filter className="w-5 h-5 mr-2" />
            <span className="font-medium">Filter Events</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className={`${
                filter === "all"
                  ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              } px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors`}
              onClick={() => handleFilterChange("all")}
            >
              All Events
            </button>
            <button
              className={`${
                filter === "free"
                  ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              } px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors`}
              onClick={() => handleFilterChange("free")}
            >
              Free Events
            </button>
            <button
              className={`${
                filter === "premium"
                  ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              } px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors`}
              onClick={() => handleFilterChange("premium")}
            >
              Premium
            </button>
            <button
              className={`${
                filter === "workshop"
                  ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              } px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors`}
              onClick={() => handleFilterChange("workshop")}
            >
              Workshop
            </button>
            <button
              className={`${
                filter === "concert"
                  ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              } px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors`}
              onClick={() => handleFilterChange("concert")}
            >
              Concert
            </button>
            <button
              className={`${
                filter === "conference"
                  ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              } px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors`}
              onClick={() => handleFilterChange("conference")}
            >
              Conference
            </button>
            <button
              className={`${
                filter === "sports"
                  ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              } px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors`}
              onClick={() => handleFilterChange("sports")}
            >
              Sports
            </button>
          </div>
        </div>

        {displayEvents.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 text-center max-w-lg mx-auto">
            <Clipboard className="w-20 h-20 mx-auto mb-6 text-indigo-500 opacity-70" />
            <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
              No Events Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {filter !== "all"
                ? "No events match your current filter. Try a different filter or create a new event."
                : "You haven't created any events yet. Get started by creating your first event!"}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate("/create-event")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </button>
              {filter !== "all" && (
                <button
                  onClick={() => handleFilterChange("all")}
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-6 rounded-lg transition-colors"
                >
                  Show All Events
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
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
                  {event.isFree || event.price === 0 ? (
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
                      <span>{formatDate(event.createdAt)}</span>
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
                      <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
                      <span>
                        {event.isFree || event.price === 0
                          ? "Free Event"
                          : `$${parseFloat(event.price).toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event Footer */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 flex justify-between items-center">
                  <button
                    onClick={() => navigate(`/edit-event/${event._id}`)}
                    className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => confirmDelete(event._id)}
                    className="flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    <span>Delete</span>
                  </button>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => navigate(`/events/${event._id}`)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-center py-3 transition-colors flex items-center justify-center"
                >
                  View Event Details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default YourEvents;
