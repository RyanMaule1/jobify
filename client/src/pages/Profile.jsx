import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { redirect, useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import customFetch from '../Utils/customFetch';
import { toast } from 'react-toastify';




export const profileAction = async({request}) => {
  const formData = await request.formData()
  
  const file = formData.get('avatar')
  
  if (file && file.size > 500000) {
     toast.error("File exceeds 0.5 MB");
    return null;
  }
  
  try {
    await customFetch.patch('/users/update-user', formData)
    toast.success("Profile successfully updated")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
  } 

  return null;
}


const Profile = () => {



  const {user} = useOutletContext();
  const {_id, firstName, email, lastName, location} = user;
  //WHENEVER SENDING A FILE, MUST INCLUDE THE ENCTYPE IN FORM TO ENCRYPT THE DATA
  const navigation = useNavigation()
  const isSubmitting = navigation.state == "submitting"

  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className='form-label'>
              Select an image file (Max 0.5 MB)
            </label>
             <input 
            type="file" 
            id='avatar' 
            name='avatar' 
            className='form-input' 
            accept='image/*' //this just means the only type of files this input accepts 
                            //are image files
            /> 
          </div>
          <FormRow type='text' name='First Name' defaultValue={firstName}/>
          <FormRow type='text' name='Last Name' defaultValue={lastName}/>
          <FormRow type='email' name='Email' defaultValue={email}/>
          <FormRow type='text' name='Location' defaultValue={location}/>
          <button className="btn btn-block form-btn" disabled={isSubmitting}>
            {isSubmitting ? "...Submitting" : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default Profile