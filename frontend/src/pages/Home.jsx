import React from "react";
import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome to EventPro
        </h1>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover, Create, and Manage Events Seamlessly
          </p>
          {/* Add more content as needed */}
        </div>
      </div>
      <Dashboard />
    </div>
  );
};

export default Home; // Make sure to use default export
