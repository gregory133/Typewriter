import React, {useEffect, useRef} from 'react'
import {processText} from '../library/processText.ts'

export default function ContentTextbox({id, canHighlight, placeholder}: {id: string; canHighlight: boolean; placeholder: string}){

	const textboxRef=useRef<HTMLTextAreaElement>(null)

    useEffect(()=>{
		if (textboxRef.current){
			textboxRef.current.readOnly=!canHighlight
		}
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
		<textarea ref={textboxRef} rows={20} className="block p-2.5 w-full
		text-gray-900 bg-gray-50 rounded-lg border text-xl
		focus:ring-blue-500 focus:border-blue-500 resize-none outline-none"
		placeholder={placeholder} onChange={onChange}>

		</textarea>
	)
}
