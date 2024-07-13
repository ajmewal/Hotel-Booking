import React, { useEffect, useState } from 'react';

function Bookings() {
    const [bookings, setBookings] = useState();
    const [Place, setPlace] = useState()
    const [Owner, setOwner] = useState()

    useEffect(() => {
        fetchData()

    }, []);


    const fetchData = () => {
        fetch('http://localhost:5000/api/bookings/get-bookings', { method: "GET", credentials: "include" })
            .then(async response => {
                const data = (await response.json())
                setBookings(Bookings =>{

                    if (data.length > 0) {
    
    
                        fetch('http://localhost:5000/api/places/place/' + data[0].place_id, {
                            method: "GET",
                        }).then(async response => {
                            const d = await response.json();
                            setPlace(d)
                            // console.log(Place.length)
                            const owner = d.owner
                            fetch('http://localhost:5000/api/auth/get-owner', {
                                method: "POST",
                                headers: { 'Content-type': "application/json" },
                                body: JSON.stringify({ id: owner })
                            }).then(async response => {
                                const d = await response.json();
                                setOwner(d)
    
                            })
                        })
                        return data
                    }else{
                        return null
                    }
                })
            })
            .catch(error => console.error('Error fetching bookings:', error));
    }

    const formatDateForInput = (d) => {
        const date = new Date(d)
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleClick = async (id) => {
        fetch('http://localhost:5000/api/bookings/delete-bookings', {
            method: "POST",
            credentials: "include",
            headers: { 'Content-type': "application/json" },
            body: JSON.stringify({ links: id })
        }).then(async response => {
            const d = await response.json();
            // setOwner(d)
            console.log(d)
            fetchData()
        })
    }

    return (
        <>
            {Place && (
                <div className="container mx-auto p-6">

                    <h1 className="text-2xl font-bold mb-6">Your Bookings</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings && bookings.map((bookings, index) => {
                            return (<div key={bookings._id} className="border rounded-lg p-4 shadow-lg">
                                <img src={Place.photos[0]} className="w-full h-48 object-cover rounded-lg mb-4" />
                                <h2 className="text-xl font-semibold mb-2">{Place.title}</h2>
                                <p className="text-gray-600">{Place.address}</p>
                                <p className="text-gray-800 mt-2">Check-in: {formatDateForInput(bookings.checkIn)}</p>
                                <p className="text-gray-800">Check-out: {formatDateForInput(bookings.checkOut)}</p>
                                <p className="text-gray-800">Guests: {bookings.adults}</p>
                                <p className="text-gray-800 mt-2 font-semibold">Total Price: ${bookings.payment}</p>
                                <div className='h-10 w-28 bg-primaryColor text-white rounded-full my-3'>
                                    <button type='button' onClick={() => { handleClick(bookings._id) }} className='w-full h-full'>
                                        Cancel
                                    </button>
                                </div>
                            </div>)
                        })}

                    </div>
                </div>
            )}
            {!Place && ("No Bookings")}
        </>
    )
}

export default Bookings;
