import React, { useContext } from 'react'
import UserContext from "../context/Users/UserContext";
import { Link, useLocation } from 'react-router-dom';
import Nav from './Nav';

function Profile() {

    const context = useContext(UserContext);

    const { user, login } = context;

    return (
        <div className='flex justify-center mt-10 w-ull '>

            <div className='w-full'>

                <div className=" m-auto w-1/4 p-4 bg-white rounded-2xl  " style={{boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)"}}>
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <img src="https://a0.muscache.com/im/pictures/user/d2a8b257-f7ed-4f41-b5da-96c39c692c5e.jpg?im_w=240" alt="Host" className="w-24 h-24 rounded-full mb-2" />
                        <div className='flex flex-col items-center'>
                        <h2 className="text-lg font-bold mb-1">{sessionStorage.name}</h2>
                        <p className="text-gray-600">Host</p>
                        </div>
                        <p className="card-text">{sessionStorage.email}</p>
                    <Link to="/logout" className="bg-amber-600 h-10 w-1/4 flex items-center justify-center rounded-3xl">Logout</Link>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Profile
