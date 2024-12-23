import React, {useEffect} from 'react'
import {processText} from '../library/processText.js'

export default function ContentTextbox({id, canHighlight, placeholder}){

	

    useEffect(()=>{
		const textbox=document.getElementById(id)
		textbox.readOnly=!canHighlight
	})

    const onChange=()=>{
		const textbox=document.getElementById('contents')
		const text=textbox.value
		const cursorPos=textbox.selectionStart
		console.log(cursorPos);

		const newText=processText(text, cursorPos)

		if (text!==newText){
			textbox.value=newText
			textbox.focus()
			textbox.selectionEnd=cursorPos-1
		};
		
	}

	return (
		<textarea id={id} rows="20" className="block p-2.5 w-full
		text-gray-900 bg-gray-50 rounded-lg border text-xl
		focus:ring-blue-500 focus:border-blue-500 resize-none outline-none"
		placeholder={placeholder} onChange={onChange}>

		</textarea>
	)
}
