"use client"
import React, { useEffect, useState } from 'react';
import { getStories } from '@/app/services/story'; // Import your API function
import Link from 'next/link';
import Spinner from '@/app/components/Spinner'

const RecentStories = () => {
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
     // const token = localStorage.getItem('token'); // Get token from local storage
     
        const data = await getStories(page, 10);
        console.log(data) // Fetch stories with pagination
        if (data) {
          setStories(data.stories);
          setTotalPages(data.totalPages);
        }
        setLoading(false);

    };

    fetchStories();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) {
    return <Spinner/>;
  }

  return (
    <div className='w-11/12 m-auto my-3 min-h-screen p-1 rounded-xl'>
      {stories.map((story) => (
        <div key={story._id} className='text-center bg-gray-900 shadow-md rounded p-3 shadow-purple-900 w-11/12 m-auto my-3 h-auto'>
          <div className='text-3xl font-anton my-3'>
            {story.title}
          </div>
          <div className='flex justify-center space-x-2 font-comic font-bold text-lg my-3'>
            {story.tags.map((tag, index) => (
              <div key={index} className='bg-gradient-to-r from-purple-950 to-black p-1 rounded-lg'>
                {tag}
              </div>
            ))}
          </div>
          <div className='font-comic text-lg my-1 bg-gray-600 rounded-xl p-2 border-2 border-gray-800'>
            {story.synopsis}
          </div>
          <Link href={`/pages/stories/read/${story._id}`} className='text-blue-200 underline hover:text-purple-400 cursor-pointer'>
            Read More
          </Link>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className='flex justify-center space-x-4 mt-6'>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className='bg-purple-500 p-2 rounded-lg text-white disabled:bg-gray-500 font-amaranth'
        >
          Previous
        </button>
        <span className='text-lg text-purple-500 font-pacifico'>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className='bg-purple-500 p-2 rounded-lg text-white disabled:bg-gray-500 font-amaranth'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentStories;
