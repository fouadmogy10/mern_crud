import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function AuthStatus() {
    const { user} = useSelector(
        (state) => state.auth
      );
    const state = useSelector(
        (state) => state
      );
      
      const [LoggedIn, setLoggedIn] = useState(false)
      const [checkStatus, setcheckStatus] = useState(true)
        useEffect(() => {
            if (user) {
                setLoggedIn(true)

            }else{
                setLoggedIn(false)
            }
            setcheckStatus(false)
        }, [user])

  return {LoggedIn,checkStatus}
}

export default AuthStatus
