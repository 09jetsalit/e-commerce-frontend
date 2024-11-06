import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';


const LoadingtoRedirect = () => {

    const [count, setCount] = useState<number>(3);
    const [redirect, setRedirect] = useState<boolean>(false);

    useEffect( () => {
        const interval = setInterval(() => {
            setCount( (currentCount:any) => {
                if(currentCount === 1) {
                    clearInterval(interval)
                    setRedirect(true)
                }
                return currentCount - 1
            })
        }, 1000);

        return () => clearInterval(interval)
    }, [])

    if(redirect){
        return <Navigate to={'/'} />
    }

  return (
    <div>No Permission, Redirect in {count}</div>
  )
}

export default LoadingtoRedirect