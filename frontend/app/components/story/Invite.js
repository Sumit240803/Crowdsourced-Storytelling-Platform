import { invite, search } from '@/app/services/user';
import React, { useState } from 'react';

const Invite = ({token}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle search query change
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Call the search function to get filtered users based on the query
    setLoading(true);
    try {
      const results = await search(token ,query); // Assuming searchUsers is passed as a prop
      setFilteredUsers(results);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle sending an invite
  const handleInvite = async (userId) => {
    try {
      await invite(userId); // Assuming inviteCollaborator is passed as a prop
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
              <span>{user.name}</span>
              <button
                onClick={() => handleInvite(user.id)}
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
