import React, { useState } from "react";

// Custom SVG Icons (previously defined icons remain the same)
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

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-red-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-purple-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
    <div className="relative min-h-screen -z-10 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Custom SVG Background */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          className="absolute"
        >
          {/* Soft gradient background */}
          <defs>
            <linearGradient
              id="softGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
            </linearGradient>

            {/* Soft blur effects */}
            <filter
              id="blurFilter"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="100" />
            </filter>
          </defs>

          {/* Background layers */}
          <rect width="100%" height="100%" fill="url(#softGradient)" />

          {/* Soft blurred circular shapes */}
          <circle
            cx="20%"
            cy="20%"
            r="300"
            fill="rgba(59, 130, 246, 0.05)"
            filter="url(#blurFilter)"
          />
          <circle
            cx="80%"
            cy="80%"
            r="350"
            fill="rgba(99, 102, 241, 0.05)"
            filter="url(#blurFilter)"
          />
          <circle
            cx="50%"
            cy="50%"
            r="250"
            fill="rgba(168, 85, 247, 0.05)"
            filter="url(#blurFilter)"
          />
        </svg>
      </div>

      {/* Rest of the Dashboard remains the same as in the original code */}
      <div className="relative z-10">
        {/* Hero Section */}
        <header className="relative h-[500px] overflow-hidden">
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-gray-900 text-center px-4">
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
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form Column */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
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

            {/* Additional Contact Information Column */}
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-lg shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Get in Touch
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <LocationIcon />
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-700">
                        Our Headquarters
                      </h4>
                      <p className="text-gray-600">
                        123 Event Street, San Francisco, CA 94105
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <ClockIcon />
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-700">
                        Support Hours
                      </h4>
                      <p className="text-gray-600">
                        Monday - Friday: 9 AM - 6 PM PST
                      </p>
                      <p className="text-gray-600">
                        Saturday: 10 AM - 4 PM PST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-6 flex space-x-4 justify-center">
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489v.385z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-pink-500 hover:text-pink-700 transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.229-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.694-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
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
