"use client"
import Nav from '@/app/components/profile/Nav'
import RecentStories from '@/app/components/RecentStories'
import useAuth from '@/app/hooks/useAuth'

import React, { useEffect, useState } from 'react'

const Profile = () => {
    const showAlert = useAuth();
  return (
    <div className='text-white overflow-x-hidden'>
        {showAlert? "Login To Acess this page " : <>
          <div>
            <Nav/>
          </div>
          <div>
            <RecentStories/>
          </div>
        </>}
    </div>
  )
}

export default Profile