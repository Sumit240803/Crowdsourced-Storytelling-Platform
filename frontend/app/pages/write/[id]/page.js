"use client"
import Nav from '@/app/components/profile/Nav'
import Spinner from '@/app/components/Spinner'
import { useParams } from 'next/navigation'
import React from 'react'

const StoryWrite = () => {
  const {id} = useParams();
  console.log(id);
  return (
    <div>
        <div>
            
<Spinner/>

        </div>
    </div>
  )
}

export default StoryWrite