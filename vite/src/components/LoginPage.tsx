import React, {useContext, useEffect, useState} from 'react'
import Navbar from './Navbar'

import { toast } from 'react-toastify';
import GoogleButton from 'react-google-button'
import LoginButton from './LoginButton'
import AuthContext from '../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'
import Button from './Button';
import ImageButton from './ImageButton'
import ImageDropDown from './ImageDropDown'

import {signInWithPopup, getAuth, signInWithRedirect, GoogleAuthProvider,
    GithubAuthProvider, FacebookAuthProvider, TwitterAuthProvider 
} from 'firebase/auth'
import MyToastContainer from './MyToastContainer'
import LanguageContext from '../contexts/LanguageContext';

export default function LoginPage() {

    const providerGoogle = new GoogleAuthProvider();
    const providerGithub = new GithubAuthProvider();
    const providerFacebook = new FacebookAuthProvider();
    const providerTwitter = new TwitterAuthProvider();

    const auth = getAuth();
    const iconLength = 50
    // const {auth, providers}=useContext(AuthContext)
    const {transcript, setLanguage}=useContext(LanguageContext)

    const navigate=useNavigate()

    /**
    Returns a promise that resolves into the result object of the sign in
     */
    function signIn(provider){
        return new Promise((resolve, reject)=>{
            signInWithPopup(auth, provider)
            .then((result)=>{
                console.log(result)
                resolve(result)
            })
            .catch(err=>{
                reject(err)
            })
        })  
    }

    /**
     * 
     * Given the credentials of the user, redirect them to
     * the write page loggged in
     */
    function redirectWithCredential(credential, result){
        const token = credential.token
        const user = result.user
        navigate('/write')
    }

    function signInGoogle(){
        signIn(providerGoogle)
        .then(result=>{
            if (result != null){
                const credential = GoogleAuthProvider.credentialFromResult(result)
                redirectWithCredential(credential, result)
            }
        })
	}

    function signInGithub(){
        signIn(providerGithub)
        .then(result=>{
            if (result != null){
                const credential = GithubAuthProvider.credentialFromResult(result)
                redirectWithCredential(credential, result)
            }
        })
    }

    function signInFacebook(){
        signIn(providerFacebook)
        .then(result=>{
            if (result != null){
                const credential = FacebookAuthProvider.credentialFromResult(result)
                redirectWithCredential(credential, result)
            }
        })
    }

    function signInTwitter(){
        signIn(providerTwitter)
        .then(result=>{
            if (result != null){
                const credential = TwitterAuthProvider.credentialFromResult(result)
                redirectWithCredential(credential, result)
            }
        })
    }

    function onClickOtherProjects(){
        window.location.href = 'https://github.com/gregory133';
    }
    
    return (
        <div className='flex flex-col h-screen'>
            <Navbar imageButtons={[
                <div className='flex items-center'>
                <div className=' font-medium
                text-white flex-row items-center justify-center'>Change Language</div>

                <ImageDropDown hoverText='Language' options={[{text:'English', symbol:'en'}, 
                {text:'French', symbol:'fr'}]} 
                image={process.env.PUBLIC_URL+'/assets/vectors/language.svg'}/> 
      
                  
            </div>,

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
            ]}/>
            <div className='flex grow'>
                <div className='flex items-center flex-1 flex-col justify-center'>
                    <h1 className='flex flex-col items-center m-4 text-6xl font-bold'>{transcript.login}</h1>
                    <p className='flex flex-col items-center m-4 text-xl'>{transcript.login_text}</p>
              
                    <div className='flex flex-col items-center'>

                        <LoginButton text='Sign in with Google' 
                        src={process.env.PUBLIC_URL+'/assets/vectors/google.svg'}
                        onClick={signInGoogle}
                        />

                        <LoginButton onClick={signInGithub} 
                        text='Sign in with Github' src={process.env.PUBLIC_URL+'/assets/vectors/github.svg'}/>
                        
                        <LoginButton onClick={signInFacebook}                    
                        text='Sign in with Facebook' src={process.env.PUBLIC_URL+'/assets/vectors/facebook.svg'}/>
                        
                        <LoginButton onClick={signInTwitter} 
                        text='Sign in with Twitter' src={process.env.PUBLIC_URL+'/assets/vectors/twitter.svg'}/>

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
                        {/* <Button text='Learn More' color='blue'/> */}
                        <Button onClick={onClickOtherProjects} text='My other projects' color='blue'/>
                    </div>
                    
                   
                </div>
                <MyToastContainer/>
            </div>
            
      
        </div>
    )
}
