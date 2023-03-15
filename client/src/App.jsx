import {BrowserRouter as Router ,Route,Routes} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Header from "./components/NavBar/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
    <Router>
      <div className="container">
        <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<SignUp/>} />
      </Routes>
      </div>
    </Router>
    <ToastContainer theme="dark" />
    </>
  );
}

export default App;
