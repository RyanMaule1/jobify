import React from 'react'
import { Link, useNavigation, Form, redirect } from 'react-router-dom'
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { Logo } from '../components'
import {FormRow} from '../components'
import customFetch from '../Utils/customFetch'
import { toast } from 'react-toastify'

export const loginAction = async ({request}) => {
  
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  

  try {
   await customFetch.post('/auth/login', data)
   // toast.success('Succesfull Login')
    return redirect('/dashboard')
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.msg)
    return error
  }
  
}

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
        <Form method='post' className='form'>
          <Logo />
          <h4>Login</h4>
          <FormRow type="email" name="email" />
          <FormRow type="password" name="password" />
          <button type='submit' className='btn btn-block' disabled={isSubmitting}>
            {isSubmitting ? "...Submitting" : "Submit"}</button>
          <p>Not a Member
            <Link to="/register" className='member-btn'>   Sign Up</Link>
          </p>
        </Form>
    </Wrapper>
  )
}

  
  
  

export default Login