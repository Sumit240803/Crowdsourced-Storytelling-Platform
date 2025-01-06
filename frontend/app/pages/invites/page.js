"use client";
import Nav from '@/app/components/profile/Nav';
import { getInvite } from '@/app/services/user';
import React, { useEffect, useState } from 'react';

const Invitess = () => {
  const [invites, setInvites] = useState([]);

  const fetchInvites = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found, please login.");
        return;
      }

      const data = await getInvite(token);
      if (data) {
        setInvites(data.Message);
        console.log('Invitation Data:', data.Message);
      }
    } catch (error) {
      console.error("Error fetching invites:", error);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#f9f9f9] to-[#f4f4f4] min-h-screen">
      {/* Navigation */}
      <div>
        <Nav />
      </div>

      {/* Invites Section */}
      <div className="p-4 md:p-8">
        {invites.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {invites.map((invite) => (
              <div
                key={invite._id}
                className="bg-white border-2 border-orange-500 rounded-lg shadow-md p-4 flex flex-col space-y-4"
              >
                <h3 className="text-orange-600 font-semibold text-xl uppercase">
                  {invite.title}
                </h3>
                <p className="text-gray-700 text-base">{invite.synopsis}</p>
                <div className="flex flex-wrap gap-2">
                  {invite.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-400 text-white text-sm px-2 py-1 rounded-xl"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No invites available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Invitess;
