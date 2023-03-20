import React from 'react'
import { Button, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function NoteItem(notes,index) {
    const {user} =useSelector(state=>state.auth)
  return (
    <Col md="6" sm="12" key={notes.notes._id}>
    <div className='note'>
         <div className="note-head d-flex align-items-center">
            <span className='fw-bolder '>
                Note from {notes.notes.isStuff ? <span>staff</span>: <span>{user.name}</span> }
            </span>
            <div className=''>
            {new Date(notes.notes.createdAt).toLocaleString("en-US")}
            </div>
            
         </div>
         <p className='mx-3'>{notes.notes.text}</p>

      
    </div>
    </Col>
  )
}

export default NoteItem
