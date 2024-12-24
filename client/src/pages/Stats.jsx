import React from 'react'
import customFetch from '../Utils/customFetch'
import ChartContainer from '../components/ChartContainer'
import StatsContainer from '../components/StatsContainer'
import { useLoaderData } from 'react-router-dom'



export const statsLoader = async() => {
  try {
   const response = await customFetch.get("/jobs/stats")
   return response.data
  } catch (error) {
    return error
  }
  
}
const Stats = () => {
  const {defaultStats, monthlyApplications} = useLoaderData()


  return (
    <>
      <StatsContainer defaultStats={defaultStats}/>
      {
        monthlyApplications?.length > 1 && (
        <ChartContainer data={monthlyApplications}/>)
        
      }
    </>
  )
}

export default Stats