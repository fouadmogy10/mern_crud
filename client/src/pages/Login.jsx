import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import RingLoader from "react-spinners/RingLoader";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isErorr, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  

  const { email, password } = formData;


  useEffect(() => {
    if (isErorr) {
        toast.error(`${message}`)
    }
    if (isSuccess || user) {
        toast.success("Login successfully")
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
    const userData = {
        email,
        password,
      };
      dispatch(login(userData))
  };
  if(isLoading) {
        
    return(
<section className="spinner row align-items-center justify-content-center">
    <RingLoader size={80} color="#36d7b7" />
</section>
)}else{
  return (
    <>
      <div className="title text-capitalize py-3">
        <h2 className="display-5 fw-bolder mb-2">
          <FaSignInAlt size={40} /> <>Login</>
        </h2>
        <span className="text-muted fs-5">please Login to your account</span>
      </div>

      <Form onSubmit={OnSubmit}>
        <Form.Group className="my-3" controlId="email">
          <Form.Control
            required
            onChange={onchange}
            name="email"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Control
            required
            onChange={onchange}
            name="password"
            value={password}
            type="password"
            placeholder="Password"
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
