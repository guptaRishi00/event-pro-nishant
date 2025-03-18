import React, { useState } from "react";

// Custom SVG Icons
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 11h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z"
    />
  </svg>
);

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MusicIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 text-purple-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(null);

  const events = [
    {
      id: 1,
      title: "Summer Music Festival",
      date: "August 15-16, 2024",
      location: "Central Park, New York",
      image: "/api/placeholder/400/250",
    },
    {
      id: 2,
      title: "Tech Innovation Conference",
      date: "September 22-24, 2024",
      location: "Silicon Valley, CA",
      image: "/api/placeholder/400/250",
    },
  ];

  const features = [
    {
      icon: <CalendarIcon />,
      title: "Easy Booking",
      description: "Seamless event registration and ticket purchasing",
    },
    {
      icon: <UsersIcon />,
      title: "Community",
      description: "Connect with event enthusiasts and make new friends",
    },
    {
      icon: <MusicIcon />,
      title: "Diverse Events",
      description: "Wide range of events from concerts to conferences",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
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
                stroke="rgba(59, 130, 246, 0.1)"
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
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
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
          <circle cx="90%" cy="80%" r="250" fill="rgba(59, 130, 246, 0.05)" />
        </svg>
      </div>

      {/* Main Content - Positioned relatively */}
      <div className="relative z-10">
        {/* Hero Section */}
        <header className="relative h-[500px] overflow-hidden">
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              EventPro: Your Gateway to Incredible Experiences
            </h1>
            <p className="text-xl max-w-2xl animate-fade-in-delay">
              Discover, Book, and Enjoy the Most Exciting Events Across the
              Country
            </p>
            <button className="mt-8 px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-all transform hover:scale-105 shadow-lg">
              Explore Events
            </button>
          </div>
        </header>

        {/* Upcoming Events */}
        <section className="container mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl relative z-20"
                onMouseEnter={() => setActiveSection(event.id)}
                onMouseLeave={() => setActiveSection(null)}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <CalendarIcon />
                    <span className="ml-2">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon />
                    <span className="ml-2">{event.location}</span>
                  </div>
                  <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16 relative z-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose EventPro?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-50 rounded-lg shadow-md transform transition-all hover:scale-105"
                >
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto py-16 px-4 relative z-20">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <MailIcon />
              <span className="ml-4">support@eventpro.com</span>
            </div>
            <div className="flex items-center mb-4">
              <PhoneIcon />
              <span className="ml-4">+1 (555) 123-4567</span>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 relative z-20">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 EventPro. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
