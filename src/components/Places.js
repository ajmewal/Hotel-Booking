import React, { useEffect, useState } from 'react'
import { Link, useActionData, useParams } from 'react-router-dom'
import Addplace from './Addplace';
import ShowPlaces from './ShowPlaces';
import Account from './Account';


function Accomodations() {
  const { action,id } = useParams();
  const [Place, setPlace] = useState({})

  useEffect(() => {
    const a =  async () => {
      const data = await fetch('http://localhost:5000/get-places', {
        credentials: "include"
      })
      setPlace(await data.json())
    }
    a()
    

  }, [])


  return (
    <div>
      <Account />
      {action ==='new' && 
      <Addplace /> }
      {action !== 'new' && (
        <div>
        <p>{action}</p>
          <div className='flex justify-center items-center flex-col mt-10 w-100 '>

            <div>

              <Link className='flex items-center gap-2 py-2 px-4 bg-primaryColor text-white rounded-full' to={'/account/places/new'}>
                <svg width={'30px'} height={'30px'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>Add New Place</Link>
            </div>
          </div>

          <div>
            <h1 className='text-3xl'>My Places</h1>
            {Object.keys(Place).length>0 && 
            <ShowPlaces place={Place} />
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default Accomodations
