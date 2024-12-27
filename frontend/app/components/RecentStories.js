import React from 'react'

const RecentStories = () => {
  return (
    <div className='bg-[url("/bg-1.jpg")] w-11/12 m-auto my-3 min-h-screen  p-1 '>
        <div className='text-center bg-gray-900 shadow-md rounded p-3 shadow-orange-900 w-11/12 m-auto my-3 h-auto  '>
            <div className='text-3xl font-anton my-3'>
            The Night Killer
            </div>
            <div className='flex justify-center space-x-2 font-comic font-bold text-lg my-3'>
                <div className='bg-orange-800 p-1 rounded-lg '>horror</div>
                <div className='bg-orange-800 p-1 rounded-lg'>mystery</div>
                <div className='bg-orange-800 p-1 rounded-lg'>thriller</div>
                <div className='bg-orange-800 p-1 rounded-lg'>drama</div>
            </div>
            <div className='font-comic text-lg my-1 bg-gray-600 rounded-xl p-2'>
            Detective Evelyn Hart, a sharp but haunted investigator, is called to unravel the mystery. With each new victim, Evelyn is drawn deeper into a labyrinth of secrets, where every clue leads her closer to a horrifying revelation........
            </div>
            <div>Read More</div>
        </div>
       
    </div>
  )
}

export default RecentStories