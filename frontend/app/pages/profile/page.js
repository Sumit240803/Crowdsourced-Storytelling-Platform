"use client"
import useAuth from '@/app/hooks/useAuth'
import { checkAuth } from '@/app/services/checkAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const showAlert = useAuth();
  return (
    <div className='text-white font-bold text-4xl'>
        {showAlert? "Login To Acess this page " : 'Logged in'}
    </div>
  )
}

export default Profile