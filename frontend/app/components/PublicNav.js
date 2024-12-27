import Link from 'next/link';
import React from 'react';

const PublicNav = () => {
  return (
    <div className="font-amaranth bg-gradient-to-r from-[#0e1a2b] via-[#251a31] to-[#4a2305] flex justify-between px-10 py-4 sm:px-1 md:px-2 xl:px-10 border-b border-gray-800">
      <div className="text-xl sm:text-2xl md:text-3xl xl:text-4xl text-orange-600">
        Narrato
      </div>
      <div className="flex space-x-4 sm:space-x-6 md:space-x-8 xl:space-x-10 text-lg sm:text-xl md:text-2xl xl:text-3xl">
        <Link href={''} className="text-blue-200">
          Latest Stories
        </Link>
        <Link href={''} className="text-green-200">
          Login
        </Link>
        <Link href={''} className="text-yellow-200">
          Help
        </Link>
      </div>
    </div>
  );
};

export default PublicNav;
