import React, {useContext, useEffect, useState} from 'react'
import Navbar from './Navbar'
import ImageButton from './ImageButton'
import ImageDropDown from './ImageDropDown';


import { toast } from 'react-toastify';
import GoogleButton from 'react-google-button'
import LoginButton from './LoginButton'
import AuthContext from '../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'
import Button from './Button';

import {signInWithPopup, getAuth, signInWithRedirect, GoogleAuthProvider} from 'firebase/auth'
import MyToastContainer from './MyToastContainer'
import LanguageContext from '../contexts/LanguageContext';

export default function LoginPage() {

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    // const {auth, providers}=useContext(AuthContext)
    const {transcript, setLanguage}=useContext(LanguageContext)
    
    
    const navigate=useNavigate()

    // useEffect(()=>{

	// 	getRedirectResult(auth)
    //     .then(result=>{
    //         console.log(result)
    //         if (result!=null){
    //             navigate('/write')
    //         }
    //     })
	// }, [])

    const signInGoogle=()=>{
        // console.log(providers['google']);
		signInWithPopup(auth, provider)
        .then((result)=>{
            if (result != null){
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = credential.token
                const user = result.user
                navigate('/write')
            }
        })
        .catch(err=>{
            console.log(err)
        })
	}
    
    return (
        <div className='flex flex-col h-screen'>
            <Navbar imageButtons={[
                <ImageDropDown hoverText='Language' options={[{text:'English', symbol:'en'}, {text:'French', symbol:'fr'}]} image={process.env.PUBLIC_URL+'/assets/vectors/language.svg'}/>,
                <ImageButton hoverText='How To Use' src={process.env.PUBLIC_URL+'/assets/vectors/book.svg'}/>
            ]}/>
            <div className='flex grow'>
                <div className='flex items-center flex-1 flex-col justify-center
                '>
                    <h1 className='flex flex-col items-center m-4 text-6xl font-bold'>{transcript.login}</h1>
                    <p className='flex flex-col items-center m-4 text-xl'>{transcript.login_text}</p>
                    {/* <img className='p-4 w-64 h-64' src='http://localhost:3000/assets/vectors/text.svg'/> */}
                    <div className='flex flex-col items-center'>
                        <LoginButton text='Sign in with Google' src={process.env.PUBLIC_URL+'/assets/vectors/google.svg'}
                        onClick={signInGoogle}
                        />
                        <LoginButton onClick={()=>{toast('not implemented yet')}} text='Sign in with Github' src={process.env.PUBLIC_URL+'/assets/vectors/github.svg'}/>
                        <LoginButton onClick={()=>{toast('not implemented yet')}} text='Sign in with Facebook' src={process.env.PUBLIC_URL+'/assets/vectors/facebook.svg'}/>
                        <LoginButton onClick={()=>{toast('not implemented yet')}} text='Sign in with Twitter' src={process.env.PUBLIC_URL+'/assets/vectors/twitter.svg'}/>

                    </div>
                </div>
                <div className='hidden md:flex flex-col items-center flex-1 bg-gradient-to-r to-cyan-300 from-blue-300'>
                    <img className='flex-1 m-4 w-1/4' 
                    src={process.env.PUBLIC_URL+'/assets/vectors/text.svg'}/>
                    <h1 className=' font-bold text-5xl m-4' style={{fontFamily: 'Special Elite'}}>
                        Typewriter
                    </h1>
                    <p className='text-xl font-bold'>
                        A Text Editor to easily type accented characters
                    </p>


                    <div className='flex flex-1 flex-row items-center justify-center'>
                        <Button text='Learn More' color='blue'/>
                        <Button text='My other projects' color='blue'/>
                    </div>
                    
                   
                </div>
                <MyToastContainer/>
            </div>
            
      
        </div>
    )
}
