import React from 'react'
import {Tooltip} from '@mui/material'

export default function Button({ text, color, onClick, hoverText}) {

    const mainColors={
        'blue': 'bg-blue-500',
        'green': 'bg-green-500',
        'red': 'bg-red-500',
        'gray': 'bg-gray-500'
    }

    const hoverColors={
        'blue': 'hover:bg-blue-700',
        'green': 'hover:bg-green-700',
        'red': 'hover:bg-red-700',
        'gray': 'hover:bg-gray-700'
    }

    return (
        // <Tooltip arrow title={hoverText}>
            <button onClick={onClick} className={`${mainColors[color]} ${hoverColors[color]}
            text-white font-bold py-2 px-4 rounded m-4 shadow-lg duration-300`}>
                {text}
            </button>
        // </Tooltip>
    )
}
