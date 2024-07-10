import React,{useState,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import UserContext from "../context/Users/UserContext";

function Login() {
  const context = useContext(UserContext);

  const { user, login,cookies,setCookie,removeCookie} = context;

  const [cred, setcred] = useState({ email: "", password: "" })
  const navigate = useNavigate()
  // const [cookies, setCookie] = useCookies(['JwtToken'])
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            "email": cred.email,
            "password": cred.password
        }),
        headers: { "Content-Type": "application/json", Accept: 'application/json', }
    })
    if (!data.ok) {
        console.log(data.status)
      } else {
      console.log(data.status)
        const token = await data.json()
        setCookie('JwtToken', token.jwtData, { path: '/' })
        navigate('/')
        console.log("user not created");
     }
    }



    const onChange = (e) => {
      setcred({ ...cred, [e.target.name]: e.target.value })
  }

  return (
    <div className='grow h-[100vh] flex flex-col items-center justify-center'>
      <h1 className='text-4xl text-center'>Login</h1>
      <form className='flex flex-col justify-center items-center my-20 mx-auto w-1/4 '>
        <input type="email" name='email' placeholder='JohnDoy@email.com' onChange={onChange} />
        <input type="password" name='password' placeholder='Password' onChange={onChange} />
        <button onClick={handleSubmit} type='submit' className='btn bg-primaryColor w-1/2'> Login</button>
        <div>
          Don't have account yet?<Link to="/register" className='text-[blue] hover:underline'> Register</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
