import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import AuthStatus from '../hooks/AuthStatus'
import Spinner from './Spinner';

function PrivateRoutes() {
    const {LoggedIn,checkStatus} =AuthStatus();
    if (checkStatus) {
        return <Spinner/>
    }
  return LoggedIn ? <Outlet/> : <Navigate to={"/login"}/>
}

export default PrivateRoutes
