import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



function Register() {
  const [cred, setcred] = useState({ name: "", email: "", password: "" })
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch('http://localhost:5000/api/auth/createUser', {
        method: 'POST',
        body: JSON.stringify({
            "name": cred.name,
            "email": cred.email,
            "password": cred.password
        }),
        headers: { "Content-Type": "application/json", Accept: 'application/json', }
    })
    if (!data.ok) {
        console.log(data.status)
      } else {
      console.log(data.status)
        // const token = await data.json()
        // setCookie('JwtToken', token.jwtData, { path: '/' })
        // navigate('/login', { state: { message: 'Account Created successfully ! Login with your credentials' } })
        // console.log("user not created");
     }
    }



    const onChange = (e) => {
      setcred({ ...cred, [e.target.name]: e.target.value })
  }

  return (
    <div className='grow h-[100vh] flex flex-col items-center justify-center'>
      <h1 className='text-4xl text-center'>Register</h1>
      <form className='flex flex-col justify-center items-center my-20 mx-auto w-1/4 '>
        <input type="text" name='name' placeholder='John Doy' onChange={onChange} />
        <input type="email" name='email' placeholder='JohnDoy@email.com' onChange={onChange} />
        <input type="password" name='password' placeholder='Password' onChange={onChange} />
        <button onClick={handleSubmit} type='submit' className='bg-primaryColor w-1/2'>Register</button>
        <div>
          Have an account?<Link to="/login" className='text-[blue] hover:underline'> Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
