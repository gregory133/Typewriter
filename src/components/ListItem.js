import React, { useContext, useState } from 'react'
import NotesContext from '../contexts/NotesContext'

export default function ListItem({note, bgColor}) {

    const [selected, setSelected]=useState(false)

    const {onClickListItem}=useContext(NotesContext)
    const title=note.title==''? 'Untitled' : note.title
    const contents=note.contents

    const hoverColor={
        'bg-gray-200': 'hover:bg-gray-300',
        'bg-yellow-200': 'hover:bg-yellow-300',
        'bg-green-200': 'hover:bg-green-300',   
    }

    // const bgColor=selected?'bg-gray-400':'bg-gray-200'

    return (
        <button onClick={()=>{onClickListItem(note, setSelected)}} className={` rounded-lg text-left
        ${bgColor} ${hoverColor[bgColor]} duration-300 shadow-md w-10/12 h-20 p-4 mx-4 my-2`}>
            <h1 className='font-bold text-xl text-ellipsis '
                style={{overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {title}
            </h1>
            <p className=' text-sm text-ellipsis w-full' 
            style={{overflow: 'hidden', whiteSpace: 'nowrap'}}>
                {contents}
            </p>
        </button>
    )
}
