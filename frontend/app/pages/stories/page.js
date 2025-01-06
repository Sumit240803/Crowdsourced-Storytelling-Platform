"use client";
import Nav from '@/app/components/profile/Nav';
import { getInvite, joinedStories } from '@/app/services/user';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const MyStory = () => {
  const [stories, setStories] = useState({ storiesParticipated: [], storiesCreated: [] });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const data = await joinedStories(token);
      const invitation = await getInvite(token);
      console.log(data);
      console.log(invitation);

      setStories({
        storiesParticipated: data.storiesParticipated || [],
        storiesCreated: data.storiesCreated || []
      });
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen">
      {/* Navigation */}
      <div>
        <Nav />
      </div>

      {/* Stories Participated Section */}
      <div className="my-8 p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">Stories Participated</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.storiesParticipated.length > 0 ? (
            stories.storiesParticipated.map((story) => (
              <div key={story._id} className="p-4 bg-white shadow-lg rounded-lg border border-blue-500">
                <Link href={`/pages/stories/${story._id}`}>
                  <h3 className="text-xl font-semibold text-orange-700 hover:underline">{story.title}</h3>
                </Link>
                <p className="mt-2 text-gray-600 italic">{story.synopsis}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No stories participated in yet.</p>
          )}
        </div>
      </div>

      {/* Stories Created Section */}
      <div className="my-8 p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">Stories Created</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.storiesCreated.length > 0 ? (
            stories.storiesCreated.map((story) => (
              <div key={story._id} className="p-4 bg-white shadow-lg rounded-lg border border-blue-500">
                <Link href={`/pages/stories/${story._id}`}>
                  <h3 className="text-xl font-semibold text-orange-700 hover:underline">{story.title}</h3>
                </Link>
                <p className="mt-2 text-gray-600 italic">{story.synopsis}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No stories created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyStory;
