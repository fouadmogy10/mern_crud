import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import Button from "react-bootstrap/esm/Button";
import home from "./house-home-svgrepo-com.svg"
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );
  const onClick =()=>{
    dispatch(logout())
    dispatch(reset())
    toast.success(`good bye `)
    navigate("/")

  }

  return (
    <div>
      <Navbar
        bg="white"
        variant="light"
        className=" shadow p-3 mb-5 bg-white rounded"
      >
        <Container>
          <Link className="navbar-brand" to="/">
            <img src={home} width="50" height={50} alt="" /> Logo
          </Link>
          <Nav className="ms-auto">
            {user ? (
              <Button onClick={onClick}   variant="outline-dark" >
                <FaSignOutAlt /> Logout
              </Button>
            ) : (
              <>
                <NavLink to="/login" className="nav-link">
                  <FaSignInAlt /> Login
                </NavLink>
                <NavLink to="/register" className="nav-link">
                  <FaUser /> Register
                </NavLink>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
