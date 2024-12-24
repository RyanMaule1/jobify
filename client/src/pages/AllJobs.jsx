import React, { createContext, useContext } from 'react'
import customFetch from '../Utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import SearchContainer from '../components/SearchContainer'
import JobsContainer from '../components/JobsContainer'


export const allJobsLoader = async ({request}) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
    //new URL gives us access to certain mathods for our url
    //searchParams method gives us access to the params in the url and .entries gets 
    //the values from the searchParams object
  ])
 
  try {
   const {data} = await customFetch.get('/jobs', {params})
   return {data, searchValues: {...params}};
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
const AllJobsContext = createContext()
const AllJobs = () => {
  
  const {data, searchValues} = useLoaderData();
  
  return (
    <AllJobsContext.Provider value={{data, searchValues}}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext)

export default AllJobs