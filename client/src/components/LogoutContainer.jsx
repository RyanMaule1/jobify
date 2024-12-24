import React from 'react'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';

const LogoutContainer = () => {
    const [showLogout, setShowLogout] = useState(false);
    const {user, logOutUser} = useDashboardContext();

    
  return (
    <Wrapper>
        <button  className='btn logout-btn'
        onClick={() => setShowLogout(!showLogout)}>
            {user.avatar ? <img src={user.avatar} alt='Avatar' className='img'></img> : 
            <FaUserCircle />}
            <h5>{user.firstName}</h5>
            <FaCaretDown />
        </button>
        <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type='button' className='dropdown-btn' onClick={logOutUser}>Logout</button>
        </div>
    </Wrapper>
  )
}

export default LogoutContainer