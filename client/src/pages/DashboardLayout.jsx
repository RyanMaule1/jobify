import React, {useContext, createContext, useState, } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Wrapper from "../assets/wrappers/Dashboard"
import { SmallSidebar, BigSidebar, Navbar } from '../components'
import { checkDefaultTheme } from '../App'
import customFetch from '../Utils/customFetch'
import { toast } from 'react-toastify'

export const dashboardLoader = async() => {
  
  try {
    const {data} = await customFetch.get('/users/current-user')
    
    return data;
    //this request gets us the cookie of the current user sent from the backend
    //we can use this to authorize the current user 
  } catch (error) {
    console.log(error)
    return redirect('/');
    //if there is an error jusr redirect user to home  page and make the user redo 
    //the login
  }
}
//creates the dashBoardContext.provider component
const DashboardContext = createContext();

const DashboardLayout = () => {

const navigate = useNavigate();

const {user} = useLoaderData();
//useLoaderData gives us access to the value we are returning in the loader for this 
//component, we can see that in app.jsx, the loader function we are using for this
//route is imported from above and the data we are accessing is the data we are 
//requesting from the backend, which is the cookie with jwt

const [showSidebar, setShowSidebar] = useState(false)

const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())



const toggleDarkTheme = () => {
  const newDarkTheme = !isDarkTheme
  setIsDarkTheme(newDarkTheme)
  document.body.classList.toggle("dark-theme")
  localStorage.setItem("darkTheme", newDarkTheme)
}

const toggleSidebar = () => {
  setShowSidebar(!showSidebar)
}

//async because requires communication with server
const logOutUser = async () => {
  await customFetch.get('/auth/logout')
  navigate('/')
  toast.success("Succesfully logged out")
}

//wrap all in context.provider so all components within the dashBoardContext.Provider have access to the
//context which is placed in the value prop
  return (
    <DashboardContext.Provider value={{user, showSidebar, isDarkTheme,
    toggleDarkTheme, toggleSidebar, logOutUser}}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page"></div>
            <Outlet context={{user}} />
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
 
}
//custom hook 
// allows use to import the hook in other components to have all of the context values
export const useDashboardContext = () => {
  return useContext(DashboardContext)
}

export default DashboardLayout