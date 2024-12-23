import React from 'react'
import ImageButton from './ImageButton'

export default function Navbar({ imageButtons }) {
    return (
        <div className=' justify-between flex h-16 bg-neutral-900'>
            <button className='text-2xl py-2 px-6 text-white font-semibold'>
                Typewriter
            </button>
            <div className='flex items-center'>
                {imageButtons}
            </div>
            
        </div>
    )
}
