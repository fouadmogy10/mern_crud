import {BrowserRouter as Router ,Route,Routes} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Header from "./components/NavBar/Header";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewTicket from "./pages/NewTicket";
import SignUp from "./pages/SignUp";
import TicketDetails from "./pages/TicketDetails";
import Tickets from "./pages/Tickets";

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

        
        <Route path="/tickets/:id" element={<TicketDetails/>} />

        <Route path="/new-ticket" element={<PrivateRoutes/>} >
          <Route path="/new-ticket" element={<NewTicket/>}/>
        </Route>
        <Route path="/tickets" element={<PrivateRoutes/>} >
        <Route path="/tickets" element={<Tickets/>} />
        </Route>
        <Route path="/tickets/:id" element={<PrivateRoutes/>} >
        <Route path="/tickets/:id" element={<TicketDetails/>} />
        </Route>
      </Routes>
      </div>
    </Router>
    <ToastContainer theme="dark" />
    </>
  );
}

export default App;
