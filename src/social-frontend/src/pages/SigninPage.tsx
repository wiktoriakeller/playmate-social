import React from 'react'
import { useNavigate } from 'react-router-dom'
import SigninForm from '../components/form/SigninForm';

const SigninPage = () => {

  const navigate = useNavigate();

  return (
    <div className='form-page'>
      <SigninForm onSubmit={() => navigate('/secret')}/>
    </div>
  )
}

export default SigninPage