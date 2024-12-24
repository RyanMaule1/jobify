import React from 'react'
import links from '../Utils/Links'
import { NavLink } from 'react-router-dom'
import { useDashboardContext } from '../pages/DashboardLayout'

const NavLinks = ({isBigSidebar}) => {

  const linksNoAdmin = links.slice(0, length -1);
  

  const {toggleSidebar, user} = useDashboardContext();
  const {role} = user
  const checkAdmin = () => {
    return role == "admin" ? links : linksNoAdmin
  }
  
  return (
    <div className="nav-links">
              {checkAdmin().map((link )=> {
                const {id, text, path, icon} = link;
                return (<NavLink 
                          to={path} 
                          key={text} 
                          className="nav-link" 
                          onClick={isBigSidebar ? null : toggleSidebar}
                          /*end makes it so the add jobs link is not always active
                          react router and the way our nested rout is set up 
                          makes addjob always active */ 
                          
                          end>
                      <span className='icon'>{icon}</span>
                      {text}
                  </NavLink>)
              })}
      </div>
  )
}

export default NavLinks