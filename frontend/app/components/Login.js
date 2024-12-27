"use client";
import React, { useState } from 'react';
import { login } from '../services/auth';
import Spinner from './Spinner';

const Login = () => {
  // State to manage modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // State to store input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading , setLoading] = useState(false);
  // Toggle modal visibility
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    setLoading(true);
    e.preventDefault(); // Prevent form from reloading the page
    console.log("Email:", email);
    console.log("Password:", password);
    const data = await login(email , password);
    console.log(data.token);
    localStorage.setItem("token" , data.token);
    setLoading(false);
    // You can handle login logic here (e.g., make API calls)
    // Reset the form if needed
    setEmail('');
    setPassword('');
    toggleModal(); // Close modal after submit
  };

  return (
    <div>
      {/* Button to trigger the modal */}
      <button
        onClick={toggleModal}
        className="rounded-md px-4 py-2 text-green-200"
      >
        Login
      </button>

      {/* Modal/Popup Login Form */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white bg-opacity-15 p-6 rounded-md w-96 shadow-lg">
            <form onSubmit={handleSubmit}>
              {/* Username Field */}
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={toggleModal} // Close the modal
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Login
                </button>
              </div>
            </form>
             {loading ? "Loging in..." : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
