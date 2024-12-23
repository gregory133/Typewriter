import React, { useState, useEffect} from 'react';
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './LoginPage.js'
import WritingPage from './WritingPage';
import { BrowserRouter, Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import DBContext from '../contexts/DBContext'

import firebaseConfig from '../firebaseConfig.json'
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, getRedirectResult, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, updateDoc,doc} from 'firebase/firestore'
import ImageDropDown from './ImageDropDown';
import LanguageContext from '../contexts/LanguageContext'

import transcript_en from '../language/en.json'
import transcript_fr from '../language/fr.json'

function App() {

	// const [user, setUser]=useState(null)

	const [transcript, setTranscript]=useState(transcript_en)

	const app=initializeApp(firebaseConfig)
	const auth=getAuth(app)
	const db=getFirestore(app)


	const googleProvider=new GoogleAuthProvider()
	const providers={
		'google': googleProvider
	}

	const setLanguage=(lang)=>{
        if (lang=='en'){
            setTranscript(transcript_en)
        }
        else if (lang=='fr'){
            setTranscript(transcript_fr)
        }
        updateUserLanguageDB(lang)
    }

	const updateUserLanguageDB=(lang)=>{
        updateDoc(doc(db, 'users', auth.currentUser.uid), {
            language: lang
        })
    }

	// useEffect(()=>{
	// 	console.log('user:', user);
	// }, [user])
	return (
		
		<LanguageContext.Provider value={{transcript, setLanguage}}>
			<DBContext.Provider value={{db}}>
				<AuthContext.Provider value={{auth, providers}}>
					<BrowserRouter>	
						<Routes>
							<Route path='/write' element={<WritingPage/>}/>
							<Route path='/' element={<LoginPage/>}/>
						</Routes>
					</BrowserRouter>
				</AuthContext.Provider>
			</DBContext.Provider>
		</LanguageContext.Provider>

		// <ImageDropDown options={['English', 'French']} image={process.env.PUBLIC_URL+'/assets/vectors/language.svg'}/>
	);
}

export default App;
