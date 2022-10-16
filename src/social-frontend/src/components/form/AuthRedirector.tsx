import React from 'react'
import { Navigate } from 'react-router-dom';
import { useToken } from '../../hooks/useToken'

const AuthRedirector = ({children}) => {
  const {token} = useToken();
  
  if(!!token) {
    return (
      <>
      {children}
      </>
    )
  }
  return <Navigate to={"/signin"}/>

}

export default AuthRedirector