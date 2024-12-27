import React from 'react'

const RecentStories = () => {
  return (
    <div className='bg-white w-11/12 m-auto my-3 min-h-screen bg-opacity-20 p-1 '>
        <div className='text-center bg-gray-950 shadow-md rounded p-3 shadow-orange-200 w-11/12 m-auto my-3 h-auto  border border-white'>
            <div className='text-3xl font-anton'>
            The Night Killer
            </div>
            <div className='flex justify-center space-x-2 font-comic'>
                <div className='bg-gray-900 p-1 rounded-lg'>horror</div>
                <div className='bg-gray-900 p-1 rounded-lg'>mystery</div>
                <div className='bg-gray-900 p-1 rounded-lg'>thriller</div>
                <div className='bg-gray-900 p-1 rounded-lg'>drama</div>
            </div>
            <div className='font-comic text-lg'>
            Detective Evelyn Hart, a sharp but haunted investigator, is called to unravel the mystery. With each new victim, Evelyn is drawn deeper into a labyrinth of secrets, where every clue leads her closer to a horrifying revelation........
            </div>
            <div>Read More</div>
        </div>
       
    </div>
  )
}

export default RecentStories