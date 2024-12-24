import React, {useContext, useState, useEffect} from 'react'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { dashboardLoader } from './pages/DashboardLayout'

import {HomeLayout, Register, Login, Landing, DashboardLayout, Error,
AddJob, Stats, AllJobs, Profile, Admin, EditJob} from './pages'

import {  registerAction } from './pages/Register'
import { loginAction } from './pages/Login'
import { addJobAction } from './pages/AddJob'
import { allJobsLoader } from './pages/AllJobs'
import { editJobAction, editJobLoader } from './pages/EditJob'
import { deleteJobAction } from './pages/DeleteJob'
import { adminLoader } from './pages/Admin'
import { profileAction } from './pages/Profile'
import { statsLoader } from './pages/Stats'
//CreateBrowserRouter takes an array of children, pass each child a path and an element
//return the <RoutePRovide router= const assigned to the createBrowserRouter function> 
//errorElement shows up whenever an http error occurs
//children props makes the other elements children of the home element
//need to include the <Outlet /> componenet in the parent element, it makes it so the other elements
//in the parent component are shown on every path

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme)
  return isDarkTheme

}
checkDefaultTheme();


const router = createBrowserRouter([{
  path: "/",
  element: <HomeLayout />,
  errorElement: <Error />,
  children: [
    {
      index: true,
      element: <Landing />
    },
    {
      path: "register",
      element: <Register />,
      action: registerAction
      //This function happens everytime something is submitted in the register page
      //always need to return something from the action functions
    }, {
      path: "login",
      element: <Login />,
      action: loginAction
    }, {
      path: "dashboard",
      element: <DashboardLayout />,
      loader: dashboardLoader,
      //loader allows us to check the current user on any re render
      children:[
        {
          index: true,
          element: <AddJob />,
          action: addJobAction
      },
      {
          path: "stats",
          element: <Stats />,
          loader: statsLoader
      }, {
          path: "all-jobs",
          element: <AllJobs />,
          loader: allJobsLoader,
      }, 
      {
          path: "profile",
          element: <Profile />,
          action: profileAction
      }, {
        path: "admin",
        element: <Admin />,
        loader: adminLoader,
      
    }, {
      path: "edit-job/:id",
      element: <EditJob />,
      loader: editJobLoader,
      action: editJobAction
    }, {
      path: "delete-job/:id",
      action: deleteJobAction
    }]
    }
  ]
}  ])

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
