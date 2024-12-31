import { logout } from '@/app/services/auth';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { CiUser } from "react-icons/ci";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="relative font-amaranth bg-gradient-to-r from-[#0e1a2b] via-[#251a31] to-[#4a2305]">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 md:px-10">
        <Link href={"/pages/profile"} className="text-2xl text-orange-600 sm:text-3xl md:text-4xl">Narrato</Link>
        <div className="flex items-center space-x-4">
          <button className="text-orange-600 hover:text-orange-400">
            <IoMdNotificationsOutline color='yellow' size={24} />
          </button>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-orange-600 focus:outline-none hover:text-orange-400"
            >
              {isOpen ? <AiOutlineClose  size={24} /> : <AiOutlineMenu  size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Side Navigation */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#0e1a2b] transition-transform transform md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:h-auto md:flex md:w-auto md:items-center`}
      >
        <nav className="flex flex-col px-6 py-8 space-y-4 md:flex-row md:space-y-0 md:space-x-6 md:py-0">
        <Link className="text-lg text-orange-600 hover:text-orange-400 pt-1" href="/pages/user">
           <CiUser  color='yellow'/>
          </Link>
          <Link className="text-lg text-yellow-600 hover:text-yellow-400" href="#">
           Write Story
          </Link>
          
          <Link className="text-lg text-yellow-600 hover:text-yellow-400" href="#">
           My Stories
          </Link>
          <div className="text-lg text-yellow-600 hover:text-yellow-400 cursor-pointer" onClick={logout} >
           LogOut
          </div>
        </nav>
      </div>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default Nav;
