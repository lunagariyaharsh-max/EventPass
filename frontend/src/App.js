import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust path as needed
import Login from './pages/Login';
import Register from './pages/Register'; // Adjust path as needed
import EventPasses from './pages/EventPasses';
import Home from './pages/Home'; // Adjust path as needed
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/event-passes" element={<EventPasses />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;