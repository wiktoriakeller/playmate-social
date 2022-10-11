import React from 'react'
import { useNavigate } from 'react-router-dom'
import SignupForm from '../components/form/SignupForm'


const SignupPage = () => {

  const navigate = useNavigate();

  return (
    <div className='form-page'>
      <SignupForm onSubmit={() => navigate('/secret')}/>
    </div>
  )
}

export default SignupPage