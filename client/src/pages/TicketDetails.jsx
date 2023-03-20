import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  reset,
  getSingleTickets,
  closeTickets,
} from "../features/tickets/TicketSlice";
import Spinner from "../components/Spinner";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button, Col, FloatingLabel, Form } from "react-bootstrap";
import { getNote,createNote } from "../features/notes/noteSlice";
import Modal from "react-modal" 
import NoteItem from "../components/NoteItems";

const customStyle = {
  content:{
    maxWidth:'70%',
    top:'50%',
    left:"50%",
    right:"auto",
    bottom: "auto",
    marginRight:"-50%",
    transform:"translate(-50%,-50%)",
    position:'relative'
  }
}

Modal.setAppElement('#root')
function TicketDetails() {

const [isopenModal, setIsOpenModal] = useState(false)
const [noteText, setnoteText] = useState("")
  const navigate = useNavigate();

  const { ticket, isErorr, isSuccess, isLoading, message } = useSelector(
    (state) => state.tickets
  );
  const { notes, isLoading:notesIsLoading ,message:noteMessage } = useSelector(
    (state) => state.notes
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
    dispatch(getNote(id))
  }, [dispatch]);


  const closeTicket = () => {
    dispatch(closeTickets(id));
    toast.success("ticket closed successfully");
    navigate("/tickets");
  };

  // openModal
  const openModal =()=>{
    
setIsOpenModal(true)
  }
  const closeModal =()=>{

setIsOpenModal(false)
  }

  const OnSubmitModel =(e)=>{
    e.preventDefault();
    
    dispatch(createNote({noteText,id}))
    if (noteMessage) {
      toast.error(message)
    }
    setnoteText("")
    closeModal();
  }
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
      <div className="bg-light rounded-4 text-left py-2">
        <p> Description of issue</p>
        <p className="text-muted"> {ticket.description}</p>
      </div>
      <div className=" pt-5 pb-2 d-flex align-items-center justify-content-between">
      <h4 className="left">Note</h4>
        {
          ticket.status !=="closed" &&(
           <div className="left ">
             <Button variant="outline-primary " onClick={openModal}>
             <FaPlus/> Add Note
        </Button>
           </div>
          )
        }
        <Modal isOpen={isopenModal}  onRequestClose={closeModal} style={customStyle} contentLabel="Add Note" >
          <h2>Add Note</h2>
          <button className="btn-close" onClick={closeModal}></button>

          <Form onSubmit={OnSubmitModel} className="text-center">
        
      <FloatingLabel className="mb-3" controlId="floatingTextarea2" label="Description of the issue">
        <Form.Control
        onChange={(e)=>setnoteText(e.target.value)}
          as="textarea"
          value={noteText}
          name="description"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>

        <Button variant="outline-dark w-50 mx-auto" type="submit">
          Submit
        </Button>
      </Form>
        </Modal>
      </div>

      <div className="row align-items-center justyfy-content-between">

      {
        notes !== "undefined" || notes !== "" ||notes !== [] ?
        notes.map((note,index)=>{
         return(
          <>
           <NoteItem notes={note} key={note._id} index={index+1}/>
          </>
         )
        }):(
         <tr aria-rowspan={5}>
         
         <td colSpan={5}>there is no notes to show</td>
       </tr>
      )}
        
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
