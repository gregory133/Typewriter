import React from 'react'
import ImageButton from './ImageButton'
import ImageDropDown from './ImageDropDown'

export default function Navbar() {

    const iconLength = 50

    return (
        <div className='box-border justify-between flex h-16 bg-neutral-900'>
            <button className='text-2xl py-2 px-6 text-white font-semibold'>
                Typewriter
            </button>

            <div className='flex items-center h-full'>

                <div className='flex items-center'>
                    <div className=' font-medium
                    text-white flex-row items-center justify-center'>Change Language</div>
   
                    <ImageDropDown hoverText='Language' options={[{text:'English', symbol:'en'}, 
                    {text:'French', symbol:'fr'}]} 
                    image={process.env.PUBLIC_URL+'/assets/vectors/language.svg'}/> 
          
                      
                </div>

                <div className='flex items-center h-full'>
                    <div className='flex justify-center items-center text-white
                    font-medium'>Repository</div>

                    <a target='_blank' href='https://github.com/gregory133/Typewriter'>
                        <img style={{
                            height: iconLength,
                            width: iconLength
                        }}
                        className='m-8 object-contain' 
                        src={process.env.PUBLIC_URL+'/assets/vectors/github-white.svg'}/>
                    </a>
                    
                </div>

            </div>
            
        </div>
    )
}

