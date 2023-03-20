import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { reset,createTicket } from "../features/tickets/TicketSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
function NewTicket() {




  const { user } = useSelector((state) => state.auth);
  const {  isErorr, isSuccess, isLoading, message } = useSelector(
    (state) => state.tickets
  );
  const [name, setName] = useState(user.name);
  const [email, setemail] = useState(user.email);
  const [product, setProduct] = useState("");
  const [description, setdescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (isErorr) {
        toast.error(`${message}`)
    }
    if (isSuccess ) {
      dispatch(reset())
        toast.success("ticket added successfully")
        navigate("/tickets")
    }
    dispatch(reset())
    }, [isErorr, isSuccess, isLoading, message,navigate,dispatch ])


    // onSubmit form
  const OnSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({product,description}))

  };
  if(isLoading) {
        
    return(
<Spinner/>
)}else{
  return (
    <>
      <div className="title text-capitalize py-3">
        <h2 className="display-5 fw-bolder mb-2">Create New ticket</h2>
        <span className="text-muted fs-5">please fill out form below</span>
      </div>

      <Form.Group className="my-3" controlId="email">
        <Form.Control value={name} name="name" type="text" disabled />
      </Form.Group>

      <Form.Group className="my-3" controlId="password">
        <Form.Control value={email} name="email" type="text" disabled />
      </Form.Group>

      <Form onSubmit={OnSubmit}>
        <Form.Group className="my-3" controlId="email">
          <Form.Select
          name="product"
          id="product"
          onChange={(e)=>setProduct(e.target.value)} aria-label="Default select example">
            <option disabled selected value={"Product"}>Product</option>
            <option value="iphone">iphone</option>
            <option value="iMac">iMac</option>
            <option value="iPad">iPad</option>
          </Form.Select>
        </Form.Group>
      
      <FloatingLabel className="mb-3" controlId="floatingTextarea2" label="Description of the issue">
        <Form.Control
        onChange={(e)=>setdescription(e.target.value)}
          as="textarea"
          value={description}
          name="description"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>

        <Button variant="outline-dark w-50" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );}
}

export default NewTicket;
