import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function TicketsItem({tickets,index}) {
  return (
    <>
       <tr>
          <td>{index}</td>
          <td>{new Date(tickets.createdAt).toLocaleString("en-US")}</td>
          <td>{tickets.product}</td>
          <td ><span className={`px-4 py-1 status status-${tickets.status}`}>{tickets.status}</span> </td>
          <td>
            <Link to={`/tickets/${tickets._id}`}>
            <Button variant="outline-dark">
            View
          </Button>
          
            </Link>
          </td>
        </tr>
    </>
  )
}

export default TicketsItem
