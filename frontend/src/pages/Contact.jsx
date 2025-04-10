import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null); // null, 'success', 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Success simulation (in a real app, this would be based on API response)
      if (formData.email && formData.message) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
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
          <circle cx="10%" cy="20%" r="200" fill="rgba(99, 102, 241, 0.05)" />
          <circle cx="90%" cy="80%" r="250" fill="rgba(79, 70, 229, 0.05)" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-800 dark:to-indigo-900 text-white py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Have questions about EventPro? Our team is here to help you create
              unforgettable events.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact-form"
                className="bg-white text-indigo-700 hover:bg-indigo-50 py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Send a Message
              </a>
              <a
                href="#offices"
                className="bg-indigo-700 hover:bg-indigo-800 text-white border border-indigo-500 py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Our Offices
              </a>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute left-0 right-0 bottom-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            fill="#F9FAFB"
            className="dark:fill-gray-900"
          >
            <path d="M0,0 C240,70 480,100 720,100 C960,100 1200,70 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-4">
                    <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Email
                    </h4>
                    <a
                      href="mailto:support@eventpro.com"
                      className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      support@eventpro.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-4">
                    <Phone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Phone
                    </h4>
                    <a
                      href="tel:+15551234567"
                      className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-4">
                    <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Headquarters
                    </h4>
                    <address className="text-gray-600 dark:text-gray-300 not-italic">
                      123 Event Avenue
                      <br />
                      San Francisco, CA 94107
                    </address>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-4">
                    <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Working Hours
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Monday - Friday: 9AM - 6PM
                      <br />
                      Saturday: 10AM - 4PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors"
                >
                  <Facebook className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </a>
                <a
                  href="#"
                  className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors"
                >
                  <Twitter className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </a>
                <a
                  href="#"
                  className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors"
                >
                  <Instagram className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </a>
                <a
                  href="#"
                  className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2" id="contact-form">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Us a Message
              </h3>

              {formStatus === "success" ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-green-700 dark:text-green-300 mb-4">
                    Thank you for reaching out. Our team will get back to you
                    shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormStatus(null);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {formStatus === "error" && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 flex items-center text-red-800 dark:text-red-300">
                      <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                      <p>Please fill out all required fields correctly.</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                      >
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white resize-none"
                      placeholder="Please describe how we can assist you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg flex items-center justify-center font-medium transition-colors ${
                      isSubmitting
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section
        className="container mx-auto px-4 py-12 relative z-10"
        id="offices"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Our Offices
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-300 dark:bg-gray-700 relative">
              {/* This would be a map in a real application */}
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-indigo-600" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                San Francisco
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                123 Event Avenue
                <br />
                San Francisco, CA 94107
                <br />
                United States
              </p>
              <a
                href="tel:+15551234567"
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium flex items-center"
              >
                <Phone className="w-4 h-4 mr-2" /> +1 (555) 123-4567
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-300 dark:bg-gray-700 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-indigo-600" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                New York
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                456 Broadway
                <br />
                New York, NY 10013
                <br />
                United States
              </p>
              <a
                href="tel:+15559876543"
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium flex items-center"
              >
                <Phone className="w-4 h-4 mr-2" /> +1 (555) 987-6543
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-300 dark:bg-gray-700 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-indigo-600" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                London
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                78 Event Square
                <br />
                London, EC2A 4RH
                <br />
                United Kingdom
              </p>
              <a
                href="tel:+442071234567"
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium flex items-center"
              >
                <Phone className="w-4 h-4 mr-2" /> +44 20 7123 4567
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12 relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                How quickly can I expect a response?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We aim to respond to all inquiries within 24 hours during
                business days. For urgent matters, please call our customer
                support line directly.
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Do you offer customer support on weekends?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, our customer support team is available on Saturdays from
                10AM to 4PM. For inquiries received on Sundays, we'll respond on
                the following Monday.
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Can I visit your office without an appointment?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We recommend scheduling an appointment to ensure that our team
                can properly assist you. Please contact us via email or phone to
                set up a meeting time.
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                How can I become an event organizer on EventPro?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                To become an event organizer, please fill out the contact form
                selecting "Become an Organizer" as your subject. Our
                partnerships team will reach out with more information about the
                application process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-100 dark:bg-indigo-900/30 py-16 relative z-10 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-100 mb-6">
            Ready to create unforgettable events?
          </h2>
          <p className="text-indigo-800 dark:text-indigo-200 max-w-2xl mx-auto mb-8">
            Join thousands of event organizers and attendees who use EventPro to
            discover, create, and manage amazing experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg font-medium transition-colors"
            >
              Get Started
            </a>
            <a
              href="/events"
              className="bg-white text-indigo-700 hover:bg-indigo-50 py-3 px-8 rounded-lg font-medium transition-colors"
            >
              Explore Events
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
