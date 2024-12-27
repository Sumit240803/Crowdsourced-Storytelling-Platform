import Link from 'next/link';
import React from 'react';
import Login from './Login';

const PublicNav = () => {
  return (
    <div className="items-center font-amaranth bg-gradient-to-r from-[#0e1a2b] via-[#251a31] to-[#4a2305] flex justify-between px-10 py-4 sm:px-1 md:px-2 xl:px-10 border-b border-gray-800">
      <div className="text-2xl sm:text-2xl md:text-3xl xl:text-4xl text-orange-600">
        Narrato
      </div>
      <div className="items-center flex space-x-4 sm:space-x-3 md:space-x-3 xl:space-x-10 text-2xl sm:text-2xl md:text-3xl xl:text-3xl">
        <Link href={''} className="text-blue-200">
          Stories
        </Link>
        <div>

        <Login/>
        </div>
        
      </div>
    </div>
  );
};

export default PublicNav;
