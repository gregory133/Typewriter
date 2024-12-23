import React from 'react'

export default function LoginButton({onClick, src, text}) {
    return (
        <button onClick={onClick} className=' border rounded-full w-72 h-12 p-2 mx-8
        flex flex-row justify-center m-4 items-center duration-300 hover:bg-gray-100
         shadow-sm'>
            <img className=' mx-4 object-contain h-full' src={src}/>
            <p className=' font-semibold'>{text}</p>
        </button>
    )
}
