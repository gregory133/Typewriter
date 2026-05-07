import { useEffect, useRef } from 'react'

export default function Textbox({placeholder, canHighlight, border, onChange, id, setBorderColor}: 
	{placeholder: string; canHighlight: boolean; border: string; onChange: 
		(e: React.ChangeEvent<HTMLTextAreaElement>) => void; id: string; setBorderColor: (borderColor: string) => void}) {

	const textboxRef=useRef<HTMLTextAreaElement>(null)

	useEffect(()=>{
		const textbox=document.getElementById(id)
		if (id!='search'){
			textbox.readOnly=!canHighlight
		}
		
	})

	const onFocus=()=>{
		if (id=='search'){
			setBorderColor('border-blue-500')
		}
		
	}

	const onBlur=()=>{
		if (id=='search'){
			setBorderColor('border-grey-300')
		}
	}


	return (
	
		<textarea placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} ref={textboxRef}
		onChange={onChange} rows={1}
		className={`p-2.5 w-full h-14 truncate text-gray-900 bg-gray-50 rounded-lg ${border} text-xl
		focus:ring-blue-500 focus:border-blue-500 resize-none outline-none`}/>
			
	)
}
