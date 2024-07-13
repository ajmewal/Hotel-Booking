import React, { useEffect, useState, useContext } from 'react'
import { useParams, useLocation,useNavigate, Link, useSearchParams } from 'react-router-dom'
import Nav from './Nav'





function PlaceReserve() {
    const navigation = useNavigate()
    const [Owner, setOwner] = useState()
    const [Place, setPlace] = useState()
    const [Date1, setDate1] = useState('')
    const [Date2, setDate2] = useState('')
    const [adults, setadults] = useState(0)
    const [pets, setpets] = useState(0)
    const [children, setchildren] = useState(0)
    const [infants, setinfants] = useState(0)
    const [totalPrice, settotalPrice] = useState(0)
    const [totalAfterTax, settotalAfterTax] = useState(0)

    const [dateDifference, setdateDifference] = useState('')
    const [startDate, setstartDate] = useState('')
    const [endDate, setendDate] = useState('')

    const [params] = useSearchParams()
    
    const { id } = useParams()
    useEffect(() => {
        if (params.get('checkin') && params.get('checkout') && params.get('adults') && params.get('children') && params.get('infants')&& params.get('pets') ) {
    
            const adult = params.get('adults')
            const childrens =  params.get('children')
            const infant =  params.get('infants')
            const pet =  params.get('pets') 
            const date1 = params.get('checkin')
            const date2 = params.get('checkout')

            setDate1(date1)
            setDate2(date2)
            setadults(adult)
            setchildren(childrens)
            setinfants(infant)
            setpets(pet)
            calculateDateDifference(date1,date2);

            fetch('http://localhost:5000/api/places/place/' + id, {
                method: "GET",
            }).then(async response => {
            const d = await response.json();
            setPlace(d)
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
        
    }





    }, [])


    useEffect(() => {
        if (Place && dateDifference > 0) {
            const price = Place.price;
            const totalPrice = price * dateDifference;
            const totalAfterTax = (totalPrice - ((totalPrice * 20) / 100)) + ((totalPrice * 18) / 100);

            settotalPrice(totalPrice);
            settotalAfterTax(totalAfterTax);
        }
    }, [Place, dateDifference]);

    const calculateDateDifference = (date1,date2) => {
        const firstDate = new Date(date1);
        const secondDate = new Date(date2); 

        if (!date1 || !date2 || isNaN(firstDate) || isNaN(secondDate)) {
            // setDifference("Please select valid dates.");
            return;
        }
        setstartDate(String(firstDate.getDate()).padStart(2, 0))
        setendDate(String(secondDate.getDate()).padStart(2, 0))


        const timeDifference = Math.abs(secondDate - firstDate);
        const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        setdateDifference(dayDifference);
        return dayDifference
    };

    const handleCLick = async ()=>{

        fetch('http://localhost:5000/api/bookings/bookings', {
            method: "POST",
            credentials:"include",
            headers: { 'Content-type': "application/json" },
            body: JSON.stringify({ 
                place_id: id,
                checkIn: Date1,
                checkOut: Date2,
                adults: adults,
                children: children,
                infants: infants,
                pets: pets,
                payment: totalAfterTax
             })
        }).then(async response => {
            const d = await response.json();
            console.log(d)
        })
    }


    return (<>
        <Nav />
        {Place && (
            <div className="flex flex-col lg:flex-row justify-center w-[90vw] items-center m-auto lg:items-start bg-gray-100 p-6">
                <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-lg mb-6 lg:mb-0 lg:mr-6">
                    <h1 className="text-2xl font-bold mb-4">Confirm and pay</h1>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">Your trip</h2>
                        <div className="flex justify-between items-center mt-2">
                            <div>
                                <p className="text-sm">Dates</p>
                                {/* {startDate && endDate && (
                            <p className="font-medium">{startDate}-{endDate} Aug</p>
                            ) } */}
                            </div>
                            <button className="text-blue-500 hover:underline">Edit</button>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <div>
                                <p className="text-sm">Guests</p>
                                {adults && (
                                    <p className="font-medium">{adults} guest</p>

                                )}
                            </div>
                            <button className="text-blue-500 hover:underline">Edit</button>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">Pay with</h2>
                        <div className="mt-2">
                            <label className="flex items-center mb-2">
                                <input type="radio" name="payment" className="mr-2" defaultChecked />
                                Credit or debit card
                            </label>
                            <input type="text" placeholder="Card number" className="w-full border p-2 rounded mb-2" />
                            <div className="flex space-x-2 mb-2">
                                <input type="text" placeholder="MM/YY" className="w-1/2 border p-2 rounded" />
                                <input type="text" placeholder="CVV" className="w-1/2 border p-2 rounded" />
                            </div>
                            <input type="text" placeholder="Cardholder name" className="w-full border p-2 rounded mb-4" />
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">Required for your trip</h2>
                        <div className="flex justify-between items-center mt-2">
                            <input type="text" placeholder="Phone number" className="w-full border p-2 rounded" />
                            <button className="ml-2 text-blue-500 hover:underline">Add</button>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">Cancellation policy</h2>
                        <p className="text-sm mt-2">Free cancellation before 21 Jul. Cancel before 13 Aug for a partial refund. <button className="text-blue-500 hover:underline">Learn more</button></p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">Ground rules</h2>
                        <ul className="list-disc pl-5 mt-2 text-sm">
                            <li>Follow the house rules</li>
                            <li>Treat your Host's home like your own</li>
                        </ul>
                    </div>
                    <div>
                        <button onClick={handleCLick} className="w-full bg-pink-600 text-white py-2 rounded">Confirm and pay</button>
                    </div>
                </div>


                <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                        <img src={Place.photos[0]} alt="Villa" className="w-full h-32 object-cover rounded-lg mb-4" />

                        <h2 className="text-xl font-semibold">{Place.title}</h2>
                        <p className="text-sm text-gray-600">Entire villa</p>
                        <p className="text-sm text-gray-600 mb-4">4.91 (22 reviews)</p>
                    </div>
                    {dateDifference &&  ( 
                        <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between items-center mb-2">

                                <p className="text-sm">₹{Place.price} x {dateDifference} nights</p>

                                <p className="font-medium">₹{Place.price * dateDifference}</p>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm">Long stay discount</p>
                                <p className="font-medium">-₹{(Place.price * dateDifference) * (20 / 100)}</p>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm">Taxes</p>
                                <p className="font-medium">₹{(Place.price * dateDifference) * (18 / 100)}</p>
                            </div>
                            <div className="border-t pt-4 mt-4 flex justify-between items-center">
                                <p className="text-lg font-bold">Total (INR)</p>
                                <p className="text-lg font-bold">₹{totalAfterTax}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div >
        )}
    </>
    )
}

export default PlaceReserve
