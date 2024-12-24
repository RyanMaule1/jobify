import React from 'react'
import { Link, useNavigation, Form, redirect } from 'react-router-dom'
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { Logo } from '../components'
import {FormRow} from '../components'
import customFetch from '../Utils/customFetch'
import { toast } from 'react-toastify'


export const registerAction = async ({request}) => {
  const formData = await request.formData();
 // every request we make has access to the formData method
 //theis mthod has other mehtods attached to it that we can access
  const data = Object.fromEntries(formData)
  //turns the array of arrays that is the format for formData into an object
  //makes the data much easier to read
  
  try {
    await customFetch.post('/auth/register', data)
    //toast.success('Registration succesfull')
    return redirect('/login')
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.msg)
    return error
  }
  
}
const Register = () => {
  const navigation = useNavigation();
  
  const isSubmitting = navigation.state === 'submitting'

  //NEED TO USE FORM WITH A CAPITAL F NOT THE NORMAL form or else the request wont work
//need to specify the method as post or else it is a get request autimatically
  return (
    <Wrapper>
        <Form method='post' className='form'>
          <Logo />
          <h4>Register</h4>
          <FormRow type="name" name="firstName" labelText="First Name"  />
          <FormRow type="name" name="lastName" labelText="Last Name"  />
          <FormRow type="location" name="location"  />
          <FormRow type="email" name="email"  />
          <FormRow type="password" name="password"  />
          <button type='submit' className='btn btn-block' disabled={isSubmitting}>
            {`${isSubmitting ? "...submitting" : "submit"}`}</button>
          <p>Already a member 
            <Link to="/login" className='member-btn'>   Login</Link>
          </p>
        </Form>
    </Wrapper>
  )
}

export default Register