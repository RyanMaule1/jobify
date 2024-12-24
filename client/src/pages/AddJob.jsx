import React from 'react'
import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPES } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../Utils/customFetch';

export const addJobAction = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData)
  
  
  try {
    await customFetch.post('/jobs', data);
   toast.success("job added")
   return redirect('all-jobs')
  } catch (error) {
    console.log(error)
    return error
  }
}
const AddJob = () => {
  const {user} = useOutletContext();
  const navigation = useNavigation()
  const isSubmitting = navigation.state == "submitting";


  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Add Job</h4>
        <div className="form-center">
          <FormRow type='text' name='position' />
          <FormRow type='text' name='company' />
          <FormRow type='text' labelText='Job location' name='jobLocation' 
          defaultValue={user.location}/>
          <FormRowSelect 
          labelText="Job Status" 
          name='jobStatus'
          defaultValue={JOB_STATUS.PENDING}
          list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect 
          labelText="Job Type" 
          name='jobType'
          defaultValue={JOB_TYPES.FULL_TIME}
          list={Object.values(JOB_TYPES)}
          />
          <button type='submit' className='btn btn-block form-btn' 
          disabled={isSubmitting}>{isSubmitting ? "...Submitting" : "Submit"}</button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddJob