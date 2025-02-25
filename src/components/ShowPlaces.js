import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
function Showplaces(props) {

    const deletePlace = async (place) => {
        console.log(place._id)
        fetch('http://localhost:5000/api/places/deletePlace', {
            method: "POST",
            headers: { 'Content-type': "application/json" },
            body: JSON.stringify({ links: place._id })
          }).then(async response => {
            const d = await response.json();
            // setOwner(d)
            console.log(d)
    
          })
    }

    const editPlace = async (place) => {
    }


    return (
        <div className='mt-5 m-3'>
            {props.place.length > 0 && props.place.map((score, index) => {
                return (
                    <div className='relative bg-gray-100 min-h-36 h-36'>
                        <Link to={'/places/' + score._id} className='h-100'>
                            <div key={index} style={{ gridTemplateColumns: "12% 82%" }} className='grid grid-cols-2 gap-4 my-5 rounded-xl p-3'>
                                <div className=' shrink-0'>
                                    <img width={'128px'} className='rounded-xl' src={score.photos[0]} />
                                </div>
                                <div className='grow-0 shrink overflow-hidden'>
                                    <h1 className='text-2xl'>{score.title}</h1>
                                    <p className='text-sm '>{score.description}</p>
                                </div>
                            </div>
                        </Link>
                        <div className='absolute right-3 top-6 p-3 rounded-full bg-primaryColor cursor-pointer  hover:bg-[#4d90fe]' onClick={() => { editPlace(score) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                        </div>
                        <div className='absolute right-3 bottom-3 p-3 rounded-full bg-primaryColor cursor-pointer  hover:bg-[#4d90fe]' onClick={() => { deletePlace(score) }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        </div>
                    </div>)
            })}


        </div>
    )
}

export default Showplaces
