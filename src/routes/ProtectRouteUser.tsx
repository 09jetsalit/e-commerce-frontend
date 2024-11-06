import React, { useEffect, useState } from 'react'
import useEcomStore from '../store/e-com-store';
import { currentUser } from '../api/auth';
import LoadingtoRedirect from './LoadingtoRedirect';


const ProtectRouteUser = ({prop}:any) => {
    const [ok, setOk] = useState<boolean>(false);
    const user = useEcomStore((state)=> state.user)
    const token = useEcomStore((state)=> state.token)

    useEffect ( () => {
        if(user && token) {
            currentUser(token)
            .then( () => setOk(true))
            .catch( () => setOk(false))
        }
    }, [])

    return ok ? prop : <LoadingtoRedirect />

  return (
    <div>ProtectRouteUser</div>
  )
}

export default ProtectRouteUser