import React from 'react'


export default function Navbar({imageButtons}) {

    

    return (
        <div className='box-border justify-between text-xl flex h-16 bg-neutral-900'>
            <button className='text-2xl py-2 px-6 text-white font-semibold'>
                Typewriter
            </button>

            <div className='flex items-center h-full'>

                {
                    imageButtons.map(imageButton=>imageButton)
                }

            </div>
            
        </div>
    )
}

