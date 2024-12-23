import React from 'react'
import {Tooltip} from '@mui/material'

export default function ImageButton({src, hoverText, onClick}) {
    return (
        <Tooltip arrow title={hoverText}>
            <button onClick={onClick} className=' p-2 h-full mx-8'>
                <img className='object-contain h-full w-full' src={src}/>
            </button>
        </Tooltip>
        
    )
}
