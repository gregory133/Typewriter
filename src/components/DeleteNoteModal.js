import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'
import Button from './Button';

export default function DeleteNoteModal({isOpen, onRequestClose, onClickDelete, onC}) {

  const style = {
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '0px solid white',
    borderRadius: '5px',
    bgcolor: '#ffffff',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    p: 4,
  };

  return (
    <Modal open={isOpen} onClose={onRequestClose}  aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div className='flex-row justify-center items-center'>
          Are you sure you want to <span className='font-bold text-red-500'>delete</span> this note?
          <div style={{display: 'flex', flexDirection: "row", justifyContent: 'center'}}>
            <Button onClick={onClickDelete} text={'Delete'} color='red'/>
            <Button onClick={onRequestClose} text={'Cancel'} color='green'/>
          </div>
          
        </div>
      </Box>
    </Modal>
  )
}

