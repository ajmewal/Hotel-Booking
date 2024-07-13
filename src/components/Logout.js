import React, { useContext, useEffect } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'
import UserContext from "../context/Users/UserContext";
import { Link,useNavigate } from 'react-router-dom'


function Logout() {
    const navigate = useNavigate()
    const context = useContext(UserContext);
    const {removeCookie,setlogin } = context;
    useEffect(()=>{
        try {
            
            setlogin("null")
            sessionStorage.setItem("login",null)
            removeCookie('JwtToken', { path: '/' })
            navigate('/')
        } catch (error) {
            removeCookie('JwtToken', { path: '/' })
            sessionStorage.setItem("login",null)
            navigate('/login')
        }
    },[])

    return (
        <div>

        </div>
    )
}

export default Logout
