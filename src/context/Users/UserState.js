import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { CookiesProvider, useCookies } from 'react-cookie'


function UserState(props) {
  const [user, setuser] = useState([])
  const [login, setlogin] = useState("null")
  const [cookies, setCookie,removeCookie] = useCookies(['JwtToken'])
  const [date1,setdate1] = useState()
  const [date2,setdate2] = useState()



  const fetchUser = async () => {
    try {

      const data = await fetch('http://localhost:5000/api/auth/check', {
        method: 'GET',
        credentials: 'include',
      })
      if (!data.ok) {
        setlogin("null")
      } else {
        
        setlogin("true")
      }
      const users = await data.json();
      setuser({id:users._id,email:users.email,name:users.name})
      // console.log(users)
    } catch (error) {
      setlogin("null")
    }

  }
  

  return (
    <UserContext.Provider value={{ user, date1,date2,setdate1,setdate2, login, fetchUser,cookies,setCookie,removeCookie,setlogin }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
