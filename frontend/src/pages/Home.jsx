import React from 'react';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')" }}
      ></div>
      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Event Pass Manager</h1>
        <p className="text-lg mb-6 max-w-md text-center">
          Easily create, manage, and validate event passes with our secure and user-friendly platform. Start by logging in or registering below!
        </p>
        <div className="flex space-x-4">
          <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Login</a>
          <a href="/register" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Home;