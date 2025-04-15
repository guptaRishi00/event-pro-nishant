import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./context/AuthContext";
import EventForm from "./components/EventForm";
import EventCard from "./pages/EventCard";
import ClientRegister from "./pages/ClientRegister";
import { Profiler } from "react";
import UserProfile from "./pages/UserProfile";
import PostEvent from "./pages/PostEvent";
import YourEvents from "./pages/YourEvents";
import EventDetails from "./pages/EventDetails";
import RegisteredEvents from "./pages/RegisteredEvents";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/event-form" element={<EventForm />} />
          <Route path="/events" element={<EventCard />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/client-register" element={<ClientRegister />} />
          <Route path="/post-event" element={<PostEvent />} />
          <Route path="/your-events" element={<YourEvents />} />
          <Route path="/event-details/:id" element={<EventDetails />} />
          <Route path="/registered-events" element={<RegisteredEvents />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
