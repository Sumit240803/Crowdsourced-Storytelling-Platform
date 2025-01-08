"use client";
import { logout } from '@/app/services/auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { CiUser } from "react-icons/ci";
import { getInvite, getNotification, markNotificationsAsRead } from '@/app/services/user'; // Include the mark as read service

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [invites , setInvites] = useState([]);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotifications = async () => {
    if (!notificationOpen) {
      // Mark notifications as read when the dropdown is opened
      await markAsRead();
    }
    setNotificationOpen(!notificationOpen);
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found, please login.");
        return;
      }

      const data = await getNotification(token);
      if(data){

        setNotificationCount(data.Notifications.length);
        setNotifications(data.Notifications);
        console.log('Notification Data:', data.Notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  const fetchInvites =async()=>{
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found, please login.");
        return;
      }

      const data = await getInvite(token);
      if(data){

        console.log(invites);
        setInvites(data.Message);
        console.log('invitation Data:', data);
      }
    } catch (error) {
      console.error("Error fetching invites:", error);
    }
  }

  const markAsRead = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found, please login.");
        return;
      }

      const response = await markNotificationsAsRead(token); // Call API to mark notifications as read
      if (response.status === 200) {
        console.log("Notifications marked as read");
        setNotificationCount(0); // Reset the notification count
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchInvites();
  }, []);

  return (
    <div className="relative font-amaranth bg-gradient-to-r from-[#0e1a2b] via-[#251a31] to-[#4a2305]">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 md:px-10">
        <Link href={"/pages/profile"} className="text-2xl text-orange-600 sm:text-3xl md:text-4xl">Narrato</Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              className="relative text-orange-600 hover:text-orange-400"
              onClick={toggleNotifications}
            >
              <IoMdNotificationsOutline color="yellow" size={24} />
              {notificationCount > 0 && (
                <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </div>
              )}
            </button>
            {/* Notifications Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#0e1a2b] text-yellow-600 border border-gray-800 rounded shadow-lg z-10">
                <ul className="py-2">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <li key={index} className="px-4 py-2 border-b border-gray-800 hover:bg-gray-700">
                        {notification}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-center text-gray-500">No notifications</li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-orange-600 focus:outline-none hover:text-orange-400"
            >
              {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Side Navigation */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#0e1a2b] transition-transform transform md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:h-auto md:flex md:w-auto md:items-center`}
      >
        <nav className="flex flex-col px-6 py-8 space-y-4 md:flex-row md:space-y-0 md:space-x-6 md:py-0">
          <Link className="text-lg text-orange-600 hover:text-orange-400 pt-1" href="/pages/user">
            <CiUser color="yellow" />
          </Link>
          <Link className="text-lg text-yellow-600 hover:text-yellow-400" href="/pages/write">
            Write Story
          </Link>
          <Link className="text-lg text-yellow-600 hover:text-yellow-400" href="/pages/stories">
            My Stories
          </Link>
          <Link className="relative text-lg text-yellow-600 hover:text-yellow-400" href="/pages/invites">
            Story Invites
            {invites.length > 0 ?
            <span className='absolute w-2 rounded-full h-2 bg-orange-100 border-2 border-black top-1'></span>
            : ""}
          </Link>
          
          <div className="text-lg text-yellow-600 hover:text-yellow-400 cursor-pointer" onClick={logout}>
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
