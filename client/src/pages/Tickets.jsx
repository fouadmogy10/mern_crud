import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, getTickets } from "../features/tickets/TicketSlice";
import Spinner from "../components/Spinner";
import Table from "react-bootstrap/Table";
import TicketsItem from "../components/TicketsItem";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Tickets() {
  const { tickets, isErorr, isSuccess, isLoading, message } = useSelector(
    (state) => state.tickets
  );


  const dispatch = useDispatch();

  useEffect(() => {
  return ()=>{
    if (isSuccess) {
      dispatch(reset())
    }
  }
  }, [isSuccess,dispatch])

  useEffect( () => {
    if (isErorr) {
      toast.error(message)
    }
      dispatch(getTickets());
      console.log(tickets);
  }, [isErorr,dispatch]);
  console.log(tickets);
  if (isLoading) {
    return <Spinner />;
  } 
    return (
      <div>
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th> Product</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
            {
             tickets !== "undefined" || tickets !== "" ||tickets !== [] ?
             tickets.map((ticket,index)=>{
              return(
                <TicketsItem tickets={ticket} key={ticket._id} index={index+1}/>
              )
             }):(
              <tr aria-rowspan={5}>
              
              <td colSpan={5}>there is no tickets to show</td>
            </tr>
             )
            }
          </tbody>
        </Table>
      </div>
    );
  
}

export default Tickets;
