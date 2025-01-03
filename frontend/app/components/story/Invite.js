"use client"
import { invite, search } from '@/app/services/user';
import React, { useState } from 'react';

const Invite = ({id}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Handle search query change
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Call the search function to get filtered users based on the query
    setLoading(true);
    try {
      const results = await search(token, query);
      if (results && results.username) {
        // Wrap result in an array (even if it's just one user)
        setFilteredUsers([results]); // You could also add a check for results.username if necessary
      } else {
        setFilteredUsers([]); // Empty result if no match found
      }
    } catch (error) {
      console.error('Error searching users:', error);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle sending an invite
  const handleInvite = async (userId,storyId) => {
    try {
      const userArray =[];
      userArray.push(userId);
      console.log(userArray , storyId , token);
      await invite(storyId, userArray ,token); // Assuming invite function is passed as a prop
      alert('Collaborator invited!');
    } catch (error) {
      console.error('Error inviting collaborator:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto font-comic p-6 bg-gray-800 text-white rounded-xl">
      <h1 className="text-3xl font-bold mb-6">Invite Collaborators</h1>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search collaborators"
          className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Loading spinner */}
      {loading && <div className="text-center text-orange-500">Searching...</div>}

      {/* User list */}
      <ul className="space-y-4">
        {filteredUsers.length === 0 && !loading ? (
          <li className="text-gray-500">No collaborators found</li>
        ) : (
          filteredUsers.map((user) => (
            <li key={user.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={user.img}
                  alt={user.username}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <span>{user.username}</span>
              </div>
              <button
                onClick={() => handleInvite(id, user.id)}
                className="ml-4 py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
              >
                Invite
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Invite;
