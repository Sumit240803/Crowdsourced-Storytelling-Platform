"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import useAuth from '../hooks/useAuth';
import { checkAuth } from '../services/checkAuth';

const PublicNav = () => {
  const [showLogin, setShowLogin] = useState(true);
  const isAuth = checkAuth();

  useEffect(() => {
    // Update state based on authentication status
    setShowLogin(!isAuth);
  }, [isAuth]);

  return (
    <div className="items-center font-amaranth bg-gradient-to-r from-blue-900 via-purple-900 to-black p-4 rounded-lg shadow-lg m-3 flex justify-between px-10 py-4 sm:px-1 md:px-2 xl:px-10 border-b border-gray-800">
      <div className="text-2xl sm:text-2xl md:text-3xl xl:text-4xl text-orange-600">
        Narrato
      </div>
      <div className="items-center flex space-x-4 sm:space-x-3 md:space-x-3 xl:space-x-10 text-2xl sm:text-2xl md:text-3xl xl:text-3xl">
        <Link href={''} className="text-blue-200">
          Stories
        </Link>
        <div>
          {showLogin ? (
            <Login />
          ) : (
            <Link className='text-green-200' href="/pages/profile">Profile</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicNav;