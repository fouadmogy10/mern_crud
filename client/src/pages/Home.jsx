import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='py-5'>
    <section className='heading'>
      <h1>what do you help with?</h1>
      <p>please choose from an option below</p>
    </section>
    <Link to={"/new-ticket"} >
    <Button variant="outline-dark w-75 btn-block" >
        <FaQuestionCircle/> Create new Ticket
      </Button>
    </Link>
    <Link to={"/tickets"} >
    <Button variant="dark w-75  btn-block" >
        <FaTicketAlt/> View my Ticket
      </Button>
    </Link>
    </div>
  )
}

export default Home
