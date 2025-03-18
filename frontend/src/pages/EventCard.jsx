import React, { useState, useEffect } from "react";
import axios from "axios";

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/events")
      .then((response) => {
        setEvents(response.data.response);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Event List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <img
              src={`${event.image}`}
              alt={event.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-gray-500">
              Location: {event.location}, {event.city}
            </p>
            <p className="text-gray-500">Category: {event.category}</p>
            <p className="text-gray-500">Organizer: {event.organizer}</p>
            <p className="text-gray-500">Price: ${event.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
