import React,{useContext,useEffect} from 'react'
import {Link} from "react-router-dom";
import UserContext from "../context/Users/UserContext";
function Nav(props) {

    const context = useContext(UserContext);

    const { user, login} = context;
    useEffect(() => {
        console.log(login==="true"?"/account":'/login');
    }, [login])
    console.log(props.path)
    
    
    return (
        <div className='flex flex-col justify-center  items-center'>

            <div className='p-4 flex justify-between w-[100%] items-center'>
                <a href="" className="flex items-center w-[246px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 w-8  h-8 -rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <span className='font-bold'>airbnc</span>
                </a>
                {props.path ==="/" ? (<div className='flex'>
                    <Link to={'/stay'}><div className='px-5 py-2 active'>Stays</div></Link>
                    <Link to={'/exprience'}><div className='px-5 py-2'>Experiences</div></Link>
                    <Link to={'/online-exprience'}><div className='px-5 py-2'>Online Experiences</div></Link>
                </div>):(
                    <div className='flex serach border border-gray-300 rounded-full py-1 px-4 shadow-md shadow-gray-400 h-14 w-[40%] justify-between text-center items-center '>
                    <div className='px-3 w-[32%]'><input type="text" className='border-none' placeholder='Where'/></div>
                    <div className="ver  ml-3">
    
                    </div>
                    <div className='px-3 w-[32%]'><input type="text" className='border-none' placeholder='Check In'/></div>
                    <div className="ver ml-3">
    
                    </div>
                    <div className='px-3 w-[32%]'><input type="text" className='border-none' placeholder='Check Out'/></div>
                    <button className='bg-[#ff385c] hover:bg-[#db0b64] rounded-full w-[38px] h-[34px] items-center justify-center flex' type='button'>
    
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
    
                    </button>
                </div>
                )}
                <div className='flex'>
                    <div className='px-2 py-2 active' >Airbnc Your home</div>
                    <div className='px-2 py-2' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                    </div>
                    <div className='px-3 py-2  border border-gray-400 rounded-3xl flex' >
                        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mx-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <Link className='flex' to={`${login==="true"?"/account":'/login'}`}>

                        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mx-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <p>{`${login==='true'?`${user.name}`:""}`}</p>
                        </Link>

                    </div>
                </div>

            </div>

            <div className={`${props.path ==="/" ?"flex":"hidden"}   serach border border-gray-300 rounded-full py-1 px-4 shadow-md shadow-gray-400 w-[60%] justify-between text-center items-center`} >
                <div className='px-3 w-[32%]'><input type="text" className='border-none' placeholder='Where'/></div>
                <div className="ver  ml-3">

                </div>
                <div className='px-3 w-[32%]'><input type="text" className='border-none' placeholder='Check In'/></div>
                <div className="ver ml-3">

                </div>
                <div className='px-3 w-[32%]'><input type="text" className='border-none' placeholder='Check Out'/></div>
                <button className='bg-[#ff385c] hover:bg-[#db0b64] rounded-full w-[50px] h-[46px] items-center justify-center flex' type='button'>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </button>
            </div>



        </div>

    )
}

export default Nav
