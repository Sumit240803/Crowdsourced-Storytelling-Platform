"use client"
import Hero from '@/app/components/profile/Hero'
import Nav from '@/app/components/profile/Nav'
import useAuth from '@/app/hooks/useAuth'
import { checkAuth } from '@/app/services/checkAuth'
import { useRouter } from 'next/navigation'
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
            <Hero/>
          </div>
        </>}
    </div>
  )
}

export default Profile