import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPES } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../Utils/customFetch';


export const editJobLoader = async ({params}) => {
  

  try {
    const {data} = await customFetch.get(`/jobs/${params.id}`)
    return data
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return redirect('/dashboard/all-jobs')
  }
  
}

export const editJobAction = async({params, request}) => {


  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success("Job Successfully Edited")
    return redirect("/dashboard/all-jobs")
  } catch (error) {
    toast.error("Error Editing Job")
    return redirect('/dashboard/all-jobs')
  }
  
}

const EditJob = () => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting";
   const {job} = useLoaderData()
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Edit Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position}/>
          <FormRow type="text" name="company" defaultValue={job.company}/>
          <FormRow type="text" name="jobLocation" labelText="Job Location" defaultValue={job.jobLocation}/>
          <FormRowSelect name="jobStatus" labelText="Job Status" 
          defaultValue={job.jobStatus} list={Object.values(JOB_STATUS)}/>
          <FormRowSelect name="jobType" labelText="Job Type" 
          defaultValue={job.jobType} list={Object.values(JOB_TYPES)}/>
          <button type='submit' className='btn btn-block form-btn' disabled={isSubmitting}>
            {`${isSubmitting ? "Submitting..." : "Submit"}`}</button>

        </div>
      </Form>
    </Wrapper>
  )
}

export default EditJob