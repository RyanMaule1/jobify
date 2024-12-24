import React from 'react'
import Wrapper from "../assets/wrappers/Navbar"
import { FaAlignLeft, FaHome} from "react-icons/fa"
import Logo from './Logo'
import { useDashboardContext } from '../pages/DashboardLayout'
import LogoutContainer from './LogoutContainer'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {

  //toggleSidebar function, on click of button bring up sidebar
 
  
  return (
    <Wrapper>
      <div className="nav-center">
        <button type='button' className='toggle-btn'
        onClick={useDashboardContext().toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className='logo-text'>Dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
      </Wrapper>
  )
}

export default Navbar