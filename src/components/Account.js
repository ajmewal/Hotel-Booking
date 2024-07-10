import React, { useState, useContext, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Accounts from './Account'
import Profile from './Profile'
import Bookings from './Bookings'
import Places from './Places'
import UserContext from "../context/Users/UserContext";
import {useLocation} from 'react-router-dom';
import Nav from './Nav'

function Account() {
  let location = useLocation();
  const context = useContext(UserContext);
  const { user, login, cookies, setCookie, removeCookie } = context;
  const navigate = useNavigate()
  useEffect(() => {
    if (login === 'null') {
      navigate('/login')
    }
    
  }, [])
  
  // const location = useLocation();
  
  const subpage = location.pathname.split('/')[2] 

  const active = (type = null) => {

    if (subpage === type || (subpage === undefined && type === 'account')) {
      return "bg-primaryColor text-white"
    }
    else{
      return "bg-gray-200"
    }
  }

 

  return (
    <div >
      <Nav path={location.pathname} />
      <div className='w-full flex justify-center mt-8 gap-4'>
        <Link className={`flex gap-2 py-2 px-4 ${active('account')} rounded-2xl`} to='/account'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
          My Profile</Link>
        <Link className={`flex gap-2 py-2 px-4 ${active('bookings')} rounded-2xl`} to='/account/bookings'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
          My Bookings</Link>
        <Link className={`flex gap-2 py-2 px-4 ${active('places')} rounded-2xl`} to='/account/places'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
        </svg>
          My Accomodations </Link>
      </div>
      {
        subpage === undefined ? <Profile /> : ''
      }
    </div>
  )
}

export default Account
