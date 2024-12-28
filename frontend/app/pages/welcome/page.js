"use client"
import React from 'react';

import Login from '@/app/components/Login';

const Welcome = () => {


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform!</h1>
      <p className="text-lg mb-6">Please login to continue.</p>
      <Login/>
    </div>
  );
};

export default Welcome;
