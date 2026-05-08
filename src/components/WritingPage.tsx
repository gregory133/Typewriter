import React, {useState, useEffect, useContext} from 'react'
import Navbar from './Navbar';
import SavedTexts from './SavedTexts';
import WriteArea from './WriteArea';
import MyToastContainer from './MyToastContainer'

import ImageButton from './ImageButton';
import AuthContext from '../contexts/AuthContext.ts';

import { useNavigate } from 'react-router-dom';
import {onAuthStateChanged } from 'firebase/auth'

import { getDoc, doc, setDoc, updateDoc, addDoc, arrayUnion, query, collection, arrayRemove }
from "firebase/firestore"; 
import { signOut } from 'firebase/auth';
import DBContext from '../contexts/DBContext.ts';
import NotesContext from '../contexts/NotesContext.ts'
import { toast } from 'react-toastify';
import findAllMatches from '../library/findAllMatches.ts';


import ImageDropDown from './ImageDropDown';
import LanguageContext from '../contexts/LanguageContext.ts';
import DeleteNoteModal from './DeleteNoteModal';



export default function WritingPage() {
	const {db}=useContext(DBContext)
	const {auth}=useContext(AuthContext)

    const navigate=useNavigate()

    const [notes, setNotes]=useState<any[]>([])
    const [visibleNotes, setVisibleNotes]=useState(notes)
    const [currentNote, setCurrentNote]=useState<any>(null)
    const [upToDate, setUpToDate]=useState(true)
    const {transcript, setLanguage}=useContext(LanguageContext)

    const [isDeleteModalOpen, setIsDeleteModalOpen]=useState(false)

    const iconLength = 50

    useEffect(()=>{
        onAuthStateChanged(auth, user=>{
            
            console.log('auth state changed');
            if (!user){
                navigate('/')
                return
            }
            const uid=user.uid
            getDoc(doc(db, 'users', uid))
            .then(document=>{
                if (document.data()==undefined){
                    setDoc(doc(db, 'users', uid), {notes: [], language: 'en'})
                    setLanguage('en')

                }
                else{
                    
                    setNotes(document.data()?.notes)
                    setVisibleNotes(document.data()?.notes)
                    const language=document.data()?.language
                    // console.log(language);
                    setLanguage(language)
                    // console.log(document.data().notes);
                }
            })

        })

        window.onbeforeunload = ()=>{
            return '';
        };

        // console.log('here');
        document.getElementById('title')?.addEventListener('change', ()=>{
            setUpToDate(false)
        })
        document.getElementById('contents')?.addEventListener('change', ()=>{
            setUpToDate(false)
        })
    }, [])

    const addNoteToDatabase=(note:any)=>{
        console.log('added to db');
        updateDoc(doc(db, 'users', auth.currentUser.uid), {
            notes: arrayUnion(note)
        })
    }

    const updateNoteInDatabase=((newNote:any)=>{
        console.log('update db');
        const uid=auth.currentUser.uid
        getDoc(doc(db, 'users', uid))
        .then(document=>{
            let notes=document.data()?.notes
            // console.log(notes);
            notes.forEach((note:any)=>{
                const dateCreated=note.dateCreated
                if (dateCreated==newNote.dateCreated){
                    note.title=newNote.title
                    note.contents=newNote.contents 
                }
            })
            updateDoc(doc(db, 'users', uid), {notes: notes})
        })
    })

    const removeNoteFromDatabase=(note:any)=>{
        console.log('removed from db');
        updateDoc(doc(db, 'users', auth.currentUser.uid), {
            notes: arrayRemove(note)
        })
    }

    const createNewNote=()=>{
        let newNote={
            title: '',
            contents: '',
            dateCreated: Date.now()
        }
        setNotes([...notes, newNote])
        setCurrentNote(newNote)
        setVisibleNotes([...visibleNotes, newNote])
        addNoteToDatabase(newNote)   

    }

    const showDeleteNoteModal=()=>{
        setIsDeleteModalOpen(true)
    }

    const deleteNote=()=>{
        // console.log(currentNote);
        if (currentNote!=null){

            const titleTextbox = document.getElementById('title') as HTMLInputElement
            const contentsTextbox = document.getElementById('contents') as HTMLInputElement
            
            if (titleTextbox && contentsTextbox){
                titleTextbox.value=''
                contentsTextbox.value=''
            }

            let newNoteList=notes
            // console.log('old', newNoteList);
            newNoteList.forEach((note, index, object) => {
                if (note.dateCreated == currentNote.dateCreated) {
                    object.splice(index, 1);
                }
            });
            setVisibleNotes(newNoteList)
            removeNoteFromDatabase(currentNote)
            setCurrentNote(null)
            
            // console.log('ere');
        }
        
    }

    const saveNote=()=>{
        setUpToDate(true)
        if (currentNote!=null){

            let title:string
            let contents:string

            const titleTextbox = document.getElementById('title') as HTMLInputElement
            const contentsTextbox = document.getElementById('contents') as HTMLInputElement
            
            if (titleTextbox && contentsTextbox){
                title=titleTextbox.value
                contents=contentsTextbox.value
            }

            setCurrentNote(currentNote)
            updateNoteInDatabase(currentNote)
            let newNoteList=notes
            newNoteList.forEach(note=>{
                if (note.dateCreated==currentNote.dateCreated){
                    note.title=title
                    note.contents=contents
                }
            })
            // console.log(newNoteList);
            setNotes([...newNoteList])
        }
    }

    const copy=()=>{

        const contentsTextbox = document.getElementById('contents') as HTMLInputElement

        if (contentsTextbox){
            const contents=contentsTextbox.value
            navigator.clipboard.writeText(contents)
            toast(transcript.text_copied)
        }
        
    }

    const onClickListItem=(note:any, setSelected:any)=>{
        // unselectAllListItems()
        saveNote()
        setCurrentNote(note)
        setSelected(true)

        const titleTextbox = document.getElementById('title') as HTMLInputElement
        const contentsTextbox = document.getElementById('contents') as HTMLInputElement
        
        if (titleTextbox && contentsTextbox){
            titleTextbox.value = note.title
            contentsTextbox.value = note.contents
        }

    }

    const logout=()=>{
        navigate('/')
    }

    const onSearchboxChanged=()=>{

        const searchTextBox=document.getElementById('search') as HTMLInputElement

        if (searchTextBox)
        {
            const searchText=searchTextBox.value
            const notesToDisplay=findAllMatches(notes, searchText)
            setVisibleNotes(notesToDisplay)
        
        }

    }
    
    function onRequestCloseDeleteNoteModal(){
        setIsDeleteModalOpen(false)
    }

    function onClickDeleteButton(){
        if (currentNote){
            deleteNote()
            setIsDeleteModalOpen(false)
        }
    }


    // console.log(`${import.meta.env.BASE_URL}assets/vectors/language.svg`)

    return (

        <div>
            
            <Navbar imageButtons={[
               
                <div className='flex items-center'>
                    <div className=' font-medium
                    text-white flex-row items-center justify-center'>Change Language</div>
    
                    <ImageDropDown hoverText='Language' options={[{text:'English', symbol:'en'}, 
                    {text:'French', symbol:'fr'}]} image={`${import.meta.env.BASE_URL}assets/vectors/language.svg`}/>  
                </div>,
    
                // <div className='flex items-center h-full'>
                //     <div className='flex justify-center items-center text-white
                //     font-medium'>Logout</div>
    
                //     <a onClick={logout}>
                //         <img style={{
                //             height: iconLength,
                //             width: iconLength
                //         }}
                //         className='m-8 object-contain items-center' 
                //         src={process.env.PUBLIC_URL+'/assets/vectors/door.svg'}/>
                //     </a>   
                // </div>,

                <div className='flex items-center h-full'>
                    <div className='flex justify-center items-center text-white
                    font-medium'>My Code</div>
    
                    <a href='https://github.com/gregory133/Typewriter'>
                        <img style={{
                            height: iconLength,
                            width: iconLength
                        }}
                        className='m-8 object-contain items-center' 
                        src={`${import.meta.env.BASE_URL}assets/vectors/coding.png`}/>
                        
                    </a>   
                </div>,

                <div className='flex items-center h-full'>
                    <div className='flex justify-center items-center text-white
                    font-medium'>My Projects</div>
    
                    <a href='https://github.com/gregory133'>
                        <img style={{
                            height: iconLength,
                            width: iconLength
                        }}
                        className='m-8 object-contain items-center' 
                        src={`${import.meta.env.BASE_URL}assets/vectors/github-white.svg`}/>
                    </a>   
                </div>
                
            ]}/>
            
            <div className='flex justify-between'>
                    
                <NotesContext.Provider value={{notes, setNotes, currentNote, setCurrentNote, 
                createNewNote, saveNote, deleteNote, onClickListItem, copy, onSearchboxChanged,
                visibleNotes, setVisibleNotes, upToDate, setUpToDate, showDeleteNoteModal}}>
                    
                        <WriteArea/>     
                        <SavedTexts/>	  
                    
                </NotesContext.Provider>   
          
            </div>
    
            <MyToastContainer/>
            <DeleteNoteModal onClickDelete={onClickDeleteButton}
             onRequestClose={onRequestCloseDeleteNoteModal} isOpen={isDeleteModalOpen}/>
        </div>
    )
}
