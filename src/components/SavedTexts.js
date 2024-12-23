import React, {useState, useEffect, useContext } from 'react'
import Textbox from './Textbox'
import ListItem from './ListItem'
import findAllMatches from '../library/findAllMatches.js'
import NotesContext from '../contexts/NotesContext'

export default function SavedTexts() {

	const {notes, setNotes, currentNote, setCurrentNote, onSearchboxChanged, visibleNotes
	, upToDate}=useContext(NotesContext)

	
	const [borderColor, setBorderColor]=useState('border-gray-300')
	// useEffect(()=>{
	// 	console.log(listItemElements);
	// }, [listItemElements])

	return (
		<div className=' w-96 h-screen bg-gray-50
		m-6 flex content-center
		rounded-xl flex-col '>

			<div className={`h-16 flex flex-row items-center justify-center
				border m-2 rounded-lg overflow-y:scroll ${borderColor}
				scrollbar-thumb-gray-400 scrollbar-track-gray-100`}>
				
				<Textbox setBorderColor={setBorderColor} id='search' placeholder='Search' 
				border='border-0' onChange={onSearchboxChanged}/>	

				<img className='h-full p-2'
				src={process.env.PUBLIC_URL+'/assets/vectors/search.svg'}
				style={{backgroundSize: 'contain', pointerEvents: 'none'}}/>
			</div>

			<div className='overflow-scroll scrollbar'>
				{
					notes.length==0
					? <p className='p-4 text-gray-400 text-2xl my-4'>
						You don't have any notes yet. Click  
						<span className=' mx-2 inline text-blue-500'>
							Create 
						</span> 
						to make a new note!
					</p>
					: visibleNotes.map(note=>{
						let bgColor='bg-gray-200'
						if (note.dateCreated==currentNote?.dateCreated){
							if (upToDate){
								bgColor='bg-green-200'
							}
							else{
								bgColor='bg-yellow-200'
							}
							
						}


						return <ListItem bgColor={bgColor} note={note}/>
					})
				}
				
			</div>
		
		</div>
	)
}
