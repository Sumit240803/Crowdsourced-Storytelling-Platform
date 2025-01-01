"use client"
import Nav from '@/app/components/profile/Nav'
import { joinedStories } from '@/app/services/user'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const MyStory = () => {
  const [stories, setStories] = useState({ storiesParticipated: [], storiesCreated: [] });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const data = await joinedStories(token);
      console.log(data);

      // Assuming the response structure matches the one provided
      setStories({
        storiesParticipated: data.storiesParticipated || [],
        storiesCreated: data.storiesCreated || []
      });
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <div><Nav /></div>

      <div className="my-5 p-4 font-comic text-black border border-gray-500 rounded m-2">
        <h2 className="text-2xl font-bold mb-5 text-white">Stories Participated</h2>
        <div className="space-y-4 border-2 border-blue-500 rounded-md">
          {stories.storiesParticipated.length > 0 ? (
            stories.storiesParticipated.map((story) => (
              <div key={story._id} className="p-4 border rounded bg-gray-900">
                 <Link href={`/pages/stories/${story._id}`} className="text-2xl font-bold text-orange-700  font-amaranth">{story.title}</Link>
                <p className="italic text-gray-500">{story.synopsis}</p>
              </div>
            ))
          ) : (
            <p>No stories participated in yet.</p>
          )}
        </div>
      </div>

      <div className="my-5 p-4 font-comic text-black border border-gray-500 rounded m-2">
        <h2 className="text-2xl font-bold mb-5 text-white">Stories Created</h2>
        <div className="space-y-4 border-2 border-blue-500 rounded-md">
          {stories.storiesCreated.length > 0 ? (
            stories.storiesCreated.map((story) => (
              <div key={story._id} className="p-4 border rounded bg-gray-900">
                <Link href={`/pages/stories/${story._id}`} className="text-2xl font-bold text-orange-700  font-amaranth">{story.title}</Link>
                <p className="italic text-gray-500">{story.synopsis}</p>
              </div>
            ))
          ) : (
            <p>No stories created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyStory;
