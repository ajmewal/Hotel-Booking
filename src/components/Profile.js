import React,{useContext} from 'react'
import UserContext from "../context/Users/UserContext";
import { Link,useLocation } from 'react-router-dom';
import Nav from './Nav';

function Profile() {
   
    const context = useContext(UserContext);

    const { user, login} = context;

    return (
        <div className='flex justify-center items-start mt-10 w-100 h-[100vh]'>
            
            <div className="card  border border-gray-600 flex flex-col gap-5 p-2 w-[30vw] justify-between">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body flex flex-col gap-2">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.email}</p>
                    <Link to="/logout" className="bg-amber-600 h-10 w-1/4 flex items-center justify-center rounded-3xl">Logout</Link>
                </div>
            </div>
        </div>
    )
}

export default Profile
