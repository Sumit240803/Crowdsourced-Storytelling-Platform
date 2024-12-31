"use client"
import Nav from '@/app/components/profile/Nav'
import Create from '@/app/components/story/Create';
import Invite from '@/app/components/story/Invite';
import React from 'react'

const Write = () => {
    return (
      <div className="h-screen bg-gray-950 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-500/70 scrollbar-track-transparent">
        <div>
          <Nav />
        </div>
        <div className='flex flex-col lg:flex-row justify-between gap-10 p-5'>
            <div className='w-full lg:w-4/12 p-5 border-b lg:border-r border-white'>
                <Invite />
            </div>
            <div className='w-full lg:w-8/12 p-5'>
                <Create />
            </div>
        </div>
      </div>
    );
};

export default Write;
