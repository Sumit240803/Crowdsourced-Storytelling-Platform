import Link from 'next/link'
import React from 'react'

const PublicNav = () => {
  return (
    <div className='font-amaranth justify-between px-10 py-4 overflow-x-hidden flex border-b border-gray-800 md:text-sm xl:text-2xl'>
        <div className='font-amaranth xl:text-4xl  text-orange-600'>Narrato</div>
        <div className='flex  space-x-8'>
            <Link href={''} className='text-blue-200'>
            Latest Stories
            </Link>
            <Link href={''} className='text-green-200'>Login</Link>
            <Link href={''} className='text-yellow-200'>Help</Link>
            <div></div>
        </div>
        
    </div>
  )
}

export default PublicNav