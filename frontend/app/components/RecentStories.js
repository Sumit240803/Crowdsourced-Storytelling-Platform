import Link from 'next/link'
import React from 'react'

const RecentStories = () => {
  return (
    <div className='bg-[url("/bg-1.jpg")] w-11/12 m-auto my-3 min-h-screen  p-1 rounded-xl border-2 border-gray-800'>
        <div className='text-center bg-gray-900 shadow-md rounded p-3 shadow-purple-900 w-11/12 m-auto my-3 h-auto  '>
            <div className='text-3xl font-anton my-3'>
            The Night Killer
            </div>
            <div className='flex justify-center space-x-2 font-comic font-bold text-lg my-3'>
                <div className='bg-gradient-to-r  from-purple-950 to-black p-1 rounded-lg '>horror</div>
                <div className='bg-gradient-to-r  from-purple-950 to-black p-1 rounded-lg'>mystery</div>
                <div className='bg-gradient-to-r  from-purple-950 to-black p-1 rounded-lg'>thriller</div>
                <div className='bg-gradient-to-r  from-purple-950 to-black p-1 rounded-lg'>drama</div>
            </div>
            <div className='font-comic text-lg my-1 bg-gray-600 rounded-xl p-2 border-2 border-gray-800'>
            Detective Evelyn Hart, a sharp but haunted investigator, is called to unravel the mystery. With each new victim, Evelyn is drawn deeper into a labyrinth of secrets, where every clue leads her closer to a horrifying revelation........
            </div>
            <Link href={"/"}  className='text-blue-200 underline hover:text-purple-400 cursor-pointer'>Read More</Link>
        </div>
    </div>
  )
}

export default RecentStories