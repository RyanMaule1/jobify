import FormRow from "./FormRow"
import FormRowSelect from "./FormRowSelect"

import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPES, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';


const SearchContainer = () => {

  const debounce = (onChange) => {
    let timeOut;
    return (e) => {
      const form = e.currentTarget.form
      clearTimeout(timeOut)
      timeOut = setTimeout(() => {
        onChange(form)
      }, 250)
      
      //onChange will run whatever we pass in within the prop on the component
    }
  }
  
  const {searchValues} = useAllJobsContext()
 
  const {search, jobStatus, jobTypes, sort} = searchValues
  const submit = useSubmit()
  return (
    <Wrapper>
      <Form className='form'>
        <h5 className="form-title">Search Form</h5>
        <div className="form-center">
           <FormRow type="search" name="search" defaultValue={search}
           onChange={debounce((form) => {
            submit(form)
          })}/>
            <FormRowSelect labelText="Job Status" 
            name="jobStatus" list={
              ["all", ...Object.values(JOB_STATUS)]} 
              defaultValue={jobStatus}
              onChange={debounce((form) => {
                submit(form)
              })}
            />
            <FormRowSelect labelText="Job Type" 
            name="jobTypes" list={
              ["all", ...Object.values(JOB_TYPES)]} 
              defaultValue={jobTypes}
              onChange={debounce((form) => {
                submit(form)
              })}
            />
            <FormRowSelect name="sort" defaultValue={sort} 
            list={[
              ...Object.values(JOB_SORT_BY)
            ]}
            onChange={debounce((form) => {
              submit(form)
            })}
            />
            <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
              Reset Search Values
            </Link>
            {/* temp */}
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer