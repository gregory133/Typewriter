import React, { useContext, useEffect, useRef, useState } from 'react'
import LanguageContext from '../contexts/LanguageContext'
import {Tooltip} from '@mui/material'

export default function ImageDropDown({image, options, hoverText}) {

    const [displaying, setDisplaying]=useState(false)
    const {transcript, setLanguage}=useContext(LanguageContext)

    let menuRef=useRef()

    useEffect(()=>{
        document.addEventListener('mousedown', (event)=>{
            if (!menuRef.current.contains(event.target)){
                setDisplaying(false)
            }
            
        })
    }, [])

    const onClick=()=>{
        setDisplaying(!displaying)
        // event.stopPropagation()
    }

    const iconLength = 60
    
    return (
        
        <button ref={menuRef}  className=' my-2'>
            <img style={{
                    width: iconLength, height: iconLength
                }}
                onClick={onClick} src={image} className=' object-contain p-2 mx-8'/>
            {
                displaying
                ?<ul className='absolute text-white shadow-md'>
                    {options.map(option=>{
                        const text=option.text
                        const symbol=option.symbol
                        
                        
                        return <li onClick={()=>{setLanguage(symbol)}} className='
                        odd:bg-neutral-500 flex flex-col justify-center items-center
                        even:bg-neutral-400 hover:bg-neutral-700 duration-300 w-20 h-10
                        rounded-sm'>
                            {text}
                        </li>
                        }
                    )}
                </ul>
                
                
                
                :null    
            }
            
        </button>

    )
}
