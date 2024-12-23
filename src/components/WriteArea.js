import React, { useContext, useEffect, useState } from 'react'
import Button from './Button'
import Textbox from './Textbox'
import ContentTextbox from './ContentTextbox'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DBContext from '../contexts/DBContext';
import AuthContext from '../contexts/AuthContext';
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import NotesContext from '../contexts/NotesContext'
import LanguageContext from '../contexts/LanguageContext';

export default function WriteArea() {
    
    const {db}=useContext(DBContext)
    const {auth}=useContext(AuthContext)

    const {notes, setNotes, currentNote, setCurrentNote, createNewNote, deleteNote, 
    saveNote, copy, showDeleteNoteModal}=useContext(NotesContext)
    const {transcript, setLanguage}=useContext(LanguageContext)
    const [writingPlaceholder, setWritingPlaceholder]=useState(transcript.write_hint)

    const notify=()=>toast.info(transcript.text_copied, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
	
    const copyAll=()=>{
        const textbox=document.getElementById('textbox')
        const text=textbox.value
        navigator.clipboard.writeText(text)
        notify()
    }

    function onClickDeleteButton(){
        if (currentNote){
            showDeleteNoteModal()
        }
    }

    
    
    return (
        <div className=" w-9/12 h-12 p-6">
            
            <div className=' w-full flex flex-row-reverse content-center flex-wrap-reverse'>

                <div>
                    <Button onClick={createNewNote} text={transcript.create} 
                    color='blue' hoverText='Create a new note'/>
                    <Button onClick={saveNote} text={transcript.save} color='green' hoverText='Save changes'/>
                    <Button onClick={onClickDeleteButton} text={transcript.delete} color='red' 
                    hoverText='Delete this note'/>
                    <Button onClick={copy} text={transcript.copy} color='gray' 
                    hoverText='Copy text to clipboard'/>
                </div>	
                
                <Textbox canHighlight={currentNote!=null}  id='title' 
                placeholder={transcript.title} border='border'/>
                
            </div>
            
            <ContentTextbox placeholder={transcript.write_hint} canHighlight={currentNote!=null} 
            id='contents'/>
        </div>
    )
}
