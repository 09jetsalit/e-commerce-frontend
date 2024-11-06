import React, { useEffect, useState } from 'react'
import useEcomStore from '../store/e-com-store';
import { currentAdmin } from '../api/auth';
import LoadingtoRedirect from './LoadingtoRedirect';


const ProtectRouteAdmin = ({prop}:any) => {
    const [ok, setOk] = useState<boolean>(false);
    const user = useEcomStore((state)=> state.user)
    const token = useEcomStore((state)=> state.token)

    useEffect ( () => {
        if(user && token) {
            currentAdmin(token)
            .then( () => setOk(true))
            .catch( () => setOk(false))
        }
    }, [])

    return ok ? prop : <LoadingtoRedirect />

  return (
    <div>ProtectRouteAdmin</div>
  )
}

export default ProtectRouteAdmin