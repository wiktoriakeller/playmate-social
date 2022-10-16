import React from 'react'
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
  return (<div>no token</div>)

}

export default AuthRedirector