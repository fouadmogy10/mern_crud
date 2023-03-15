import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
function SignUp() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isErorr, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );




useEffect(() => {
if (isErorr) {
    toast.error(`${message}`)
}
if (isSuccess || user) {
    toast.success("register successfully")
    navigate("/")
    dispatch(reset())
}
}, [user, isErorr, isSuccess, isLoading, message,navigate,dispatch ])

  const onchange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const OnSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("password and confirm Password not equals");
    } else {
      const userData = {
        name,
        email,
        password,
      };
       dispatch(register(userData))
     
    }
  };
    if(isLoading) {
        
        return(
    <section className="spinner row align-items-center justify-content-center">
        <RingLoader size={80} color="#36d7b7" />
    </section>
  )}else{
     return(
        <>
          <div className="title text-capitalize py-3">
            <h2 className="display-5 fw-bolder mb-2">
              <FaUser size={40} /> register
            </h2>
            <span className="text-muted fs-5">please create an account</span>
          </div>
    
          <Form onSubmit={OnSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Control
                required
                onChange={onchange}
                name="name"
                value={name}
                type="text"
                placeholder="Enter Your Name"
                aria-describedby="basic-addon1"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                required
                onChange={onchange}
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                required
                onChange={onchange}
                name="password"
                value={password}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password2">
              <Form.Control
                required
                onChange={onchange}
                name="password2"
                type="password"
                placeholder="Confirm Password"
                value={password2}
              />
            </Form.Group>
    
            <Button variant="outline-dark w-50" type="submit">
              Submit
            </Button>
          </Form>
        </>
      )}
  

}

export default SignUp;
