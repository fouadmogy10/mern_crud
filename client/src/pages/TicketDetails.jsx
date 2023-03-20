import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  reset,
  getSingleTickets,
  closeTickets,
} from "../features/tickets/TicketSlice";
import Spinner from "../components/Spinner";

import { toast } from "react-toastify";
import { Button, Col } from "react-bootstrap";

function TicketDetails() {
  const navigate = useNavigate();

  const { ticket, isErorr, isSuccess, isLoading, message } = useSelector(
    (state) => state.tickets
  );

  const id = useParams().id;
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isErorr) {
      toast.error(message);
    }
    dispatch(getSingleTickets(id));
  }, [dispatch]);


  const closeTicket = () => {
    dispatch(closeTickets(id));
    toast.success("ticket closed successfully");
    navigate("/tickets");
  };
  if (isLoading) {
    return <Spinner />;
  }
  else{

  return (
    <div>
      <div className="py-5 row align-items-center justify-content-around">
        <Col md="6" className="justify-content-left">
          <p className="fw-bolder">Ticket Id : {ticket._id}</p>
          <p>
            Date Submitted :{" "}
            {new Date(ticket.createdAt).toLocaleString("en-US")}
          </p>
          <p>
            Product :{" "}
            {ticket.product}
          </p>
        </Col>
        <Col md="6">
          <span className={`px-5  py-1 status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </Col>
      </div>
      <hr />
      <div className="bg-light rounded-4 text-left py-5">
        <p> Description of issue</p>
        <p className="text-muted"> {ticket.description}</p>
      </div>
      {ticket.status !== "closed" && (
        <Button variant="outline-danger my-5 w-75" onClick={closeTicket}>
          Close Ticket
        </Button>
      )}
    </div>
  );
}

}

export default TicketDetails;
