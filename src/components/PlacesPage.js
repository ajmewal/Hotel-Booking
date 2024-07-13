import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams, useLocation, Link, useSearchParams, useNavigate } from 'react-router-dom'
import Nav from './Nav'
import con from '../context/Users/UserContext'

function PlacesPage() {

  const { id } = useParams()
  const d1 = useRef(null)
  const d2 = useRef(null)
  const navigate = useNavigate()
  const [Place, setPlace] = useState()
  const [clickImg, setclickImg] = useState()
  const ref = useRef()
  const [currentDate, setcurrentDate] = useState('')
  const [imageCounter, setImageCounter] = useState(0)
  const [checkoutDate, setCheckoutDate] = useState('');
  const [dateDifference, setdateDifference] = useState('')
  const location = useLocation();
  const [Owner, setOwner] = useState()
  const [hidden, sethidden] = useState(true)
  const [totalPrice, settotalPrice] = useState(0)

  const formatDateForInput = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const currentDates = (e) => {
    const date = new Date(d1.current.value)
    setcurrentDate(formatDateForInput(date))

    const checkout = new Date(d2.current.value);
    const formattedCheckoutDate = formatDateForInput(checkout);

    setCheckoutDate(formattedCheckoutDate)

    setTimeout(() => {

      calculateDateDifference()
    }, 100);
  }

  const calculateDateDifference = () => {
    const firstDate = new Date(d1.current.value);
    const secondDate = new Date(d2.current.value);

    if (!d1.current.value || !d2.current.value || isNaN(firstDate) || isNaN(secondDate)) {
      // setDifference("Please select valid dates.");
      return;
    }

    const timeDifference = Math.abs(secondDate - firstDate);
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    setdateDifference(dayDifference);
    settotalPrice(((Place.price*80)/100) * dayDifference)
  };


  useEffect(() => {

    let date = new Date()
    const checkout = new Date(date);
    setcurrentDate(formatDateForInput(date))
    checkout.setDate(date.getDate() + 5);
    const formattedCheckoutDate = formatDateForInput(checkout);
    setCheckoutDate(formattedCheckoutDate);

    if (d1.current && d2.current) {
      // calculateDateDifference();
      calculateDateDifference()
    }


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


  }, [])


  useEffect(() => {
    if (d1.current && d2.current) {
      // calculateDateDifference()
      currentDates()
    }

  }, [d1.current])



  const amenities = [
    { name: "Garden view", icon: "🌳" },
    { name: "Dedicated workspace", icon: "💻" },
    { name: "Private outdoor pool – available all year, open specific hours, lap pool", icon: "🏊" },
    { name: "AC – split-type ductless system", icon: "❄️" },
    { name: "Carbon monoxide alarm", icon: "🛑", unavailable: true },
    { name: "Wifi", icon: "📶" },
    { name: "Free parking on premises", icon: "🚗" },
    { name: "32-inch HDTV with cable/satellite TV, standard cable/satellite", icon: "📺" },
    { name: "Exterior security cameras on property", icon: "📹" },
    { name: "Smoke alarm", icon: "🚭", unavailable: true },
  ];

  const leftClick = () => {
    if (imageCounter >= 1) {

      setImageCounter(imageCounter => {
        const newImageCounter = imageCounter - 1;
        ref.current.src = Place.photos[newImageCounter]
        return newImageCounter
      })

    }
    if (imageCounter > (Place.photos.length - 1) || imageCounter < 1) {
      setImageCounter(imageCounter => {
        const newImageCounter = Place.photos.length - 1;
        ref.current.src = Place.photos[newImageCounter];
        return newImageCounter
      }
      )
    }

  }
  const rightClick = () => {
    setImageCounter(imageCounter => {
      const newImageCounter = imageCounter + 1;
      if (imageCounter < (Place.photos.length - 1)) {
        ref.current.src = Place.photos[newImageCounter]
        return newImageCounter

      } else {
        setImageCounter(imageCounter => {
          const newImageCounter = 0;
          ref.current.src = Place.photos[newImageCounter]
          return newImageCounter
        })
        return imageCounter
      }
    })

  }

  const imageclick = (test) => {
    clickImg === true ? setclickImg(null) : setclickImg(true)
    setImageCounter(imageCounter => {

      setTimeout(() => {
        ref.current.src = Place.photos[test]
        return test

      }, 100);
    })


  }

  const handleClick = () => {
    console.log(sessionStorage.getItem('login'))
    if(sessionStorage.getItem('login')==="null"){
      sessionStorage.setItem("url",`/places/reserve/${Place._id}?checkin=${currentDate}&checkout=${checkoutDate}&adults=${adults}&children=${children}&infants=${infants}&pets=${pets}`)
      navigate('/login')
  }else{

    navigate(`/places/reserve/${Place._id}?checkin=${currentDate}&checkout=${checkoutDate}&adults=${adults}&children=${children}&infants=${infants}&pets=${pets}`)
  }
  }


  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => {
    if (value > 0) setter(value - 1);
  };


  return (
    <div>
      <Nav path={location.pathname} />
      {clickImg && (
        <div className='absolute z-10 flex justify-center items-center ' style={{ height: "100vh", width: "100%", backgroundColor: "#000000e8" }}>
          <div className='m-auto relative flex items-center' style={{ height: "80vh", width: "90vw" }}>
            <div className='absolute right-24 top-4 cursor-pointer rounded-full p-2' onClick={() => { clickImg === true ? setclickImg(null) : setclickImg(true) }} style={{ backgroundColor: "rgb(255 25 25 / 90%)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
            <div onClick={() => { leftClick() }} disabled={imageCounter === 0 ? "true" : 'false'} className='p-5 m-2 cursor-pointer bg-primaryColor rounded-full'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            </div>
            <img style={{ objectFit: "cover", height: "100%", width: "100%" }} ref={ref} defaultValue="http://localhost:5000/uploads/af274496fec4d932567a1445072802fd.jpg" src="  " alt="" />
            <div onClick={() => { rightClick() }} className='p-5 m-2 cursor-pointer bg-primaryColor rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>

            </div>
          </div>
        </div>
      )}

      {!clickImg && (

        <div className='flex flex-col relative  items-center justify-center'>
          {Place && (
            <div className='w-[85%]'>
              <div className='flex justify-between mt-10 my-5 mx-1 items-center'>
                <h1 className='text-3xl'>{Place.title}</h1>
                <div className='flex gap-2'>
                  <span>save</span>
                  <span>share</span>
                </div>
              </div>
              <div className='grid grid-cols-2 h-[50vh] border rounded-2xl'>
                <div className='pr-2' style={{ height: "inherit" }}>
                  <button onClick={() => { imageclick(0) }} style={{ height: "100%", width: "100%" }} type="button">
                    <img style={{ objectFit: "fill", height: "100%", width: "100%" }} className='h-100' src={Place.photos[0]} alt="" />
                  </button>
                </div>
                <div className='grid grid-cols-2 grid-rows-2 gap-1' style={{ height: "inherit" }}>
                  <button type="button">
                    <img style={{ objectFit: "fill", height: "100%", width: "100%" }} src={Place.photos[1]} onClick={() => { imageclick(1) }} alt="" />
                  </button>
                  <button type="button">
                    <img style={{ objectFit: "fill", height: "100%", width: "100%" }} src={Place.photos[2]} onClick={() => { imageclick(2) }} alt="" />
                  </button>
                  <button type="button">
                    <img style={{ objectFit: "fill", height: "100%", width: "100%" }} src={Place.photos[3]} onClick={() => { imageclick(3) }} alt="" />
                  </button>
                  <button type="button">
                    <img style={{ objectFit: "fill", height: "100%", width: "100%" }} src={Place.photos[4]} onClick={() => { imageclick(4) }} alt="" />
                  </button>

                </div>
              </div>

              <div className='grid grid-cols-2 w-100 p-5 grid-div mt-5 '>

                <div className='flex gap-10 flex-col'>
                  <div>
                    <h1 className='text-3xl'>{Place.title}</h1>
                    <span className='text-gray-800'>{Place.maxGuests} guest . 1 baderoom . 2 beds . 1 bathroom</span>
                  </div>

                  <div>

                    <div className='hor w-[90%]' ></div>
                    <div className='flex gap-2'>
                      <div><img className='w-11 h-11 rounded-full' src="https://a0.muscache.com/im/pictures/user/User-267244391/original/06bd1896-c095-4103-b149-1ad4b5591849.jpeg?im_w=240" alt="" /></div>
                      {Owner && (<div className='flex flex-col'><span className='font-bold'>Hosted by {Owner.name}</span><span>Superhost5 years hosting</span></div>)}

                    </div>
                    <div className='hor w-[90%]' ></div>
                    <div className='flex flex-col gap-8'>
                      <div className='flex items-center gap-2'>
                        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        </div>
                        {Owner && (<div className='flex flex-col'><span className='font-bold'>Hosted by {Owner.name}</span><span>Superhost5 years hosting</span></div>)}
                      </div>
                      <div className='flex items-center gap-2'>
                        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                        </svg>

                        </div>
                        {Owner && (<div className='flex flex-col'><span className='font-bold'>Hosted by {Owner.name}</span><span>Superhost5 years hosting</span></div>)}
                      </div>
                    </div>
                    <div className='hor w-[90%]' ></div>
                    <div>
                      <div className='text-balance'>{Place.description}<br />
                        The space...
                      </div>
                      <a className='font-bold underline' href="#">Show more</a>
                    </div>
                    <div className='hor w-[90%]' ></div>

                    <div>
                      <div className="max-w-4xl mx-auto py-6">
                        <h2 className="text-2xl font-bold mb-4">Where you'll sleep</h2>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="space-y-2 pr-5">
                            <img
                              src="https://a0.muscache.com/im/pictures/miso/Hosting-675108014847583143/original/8e412862-9045-4755-87c0-5eb509848437.jpeg?im_w=480"
                              alt="Bedroom 1"
                              className="rounded-lg"
                            />
                            <h3 className="text-lg font-semibold">Bedroom 1</h3>
                            <p className="text-gray-600">1 king bed</p>
                          </div>
                          <div className="space-y-2 pr-5">
                            <img
                              src="https://a0.muscache.com/im/pictures/miso/Hosting-675108014847583143/original/8e412862-9045-4755-87c0-5eb509848437.jpeg?im_w=480"
                              alt="Bedroom 2"
                              className="rounded-lg"
                            />
                            <h3 className="text-lg font-semibold">Bedroom 2</h3>
                            <p className="text-gray-600">1 king bed</p>
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">What this place offers</h2>
                        <div className="grid grid-cols-2 gap-4">
                          {Place.perks.map((amenity, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              {/* <span
                            className={`text-2xl ${amenity.unavailable ? "text-gray-400" : "text-green-500"
                              }`}
                          >
                            {amenity.icon}
                          </span> */}
                              <span
                              // className={`${amenity.unavailable ? "text-gray-400" : "text-gray-800"
                              //   }`}
                              >
                                {amenity}
                              </span>

                            </div>
                          ))}
                        </div>
                        <button className="mt-6 px-4 py-2 bg-gray-100 text-gray-800 rounded border">
                          Show all {Place.perks.length} amenities
                        </button>
                      </div>

                    </div>

                  </div>

                </div>



                <div className='flex flex-col sticky items-center'>

                  <div className="booking-container">
                    <div className="price">
                      <div className='flex gap-3 items-center'>

                        <span className="original-price">₩{Place.price}</span>
                        <span className="discounted-price">₩{Place.price * (80 / 100)}</span>
                      </div>
                      night
                    </div>
                    <div className='border-2 rounded-lg border-gray-800'>
                      <div className="dates border-b-2   border-gray-800 flex">
                        <div className="check-in p-2 border-r-2 border-gray-800 w-1/2 inline-block ">
                          <div className='font-bold'>CHECK-IN</div>
                          {currentDate && (<input ref={d1} type="date" name="" id="" value={currentDate} onChange={e => { currentDates() }} />)}
                        </div>

                        <div className="check-out p-2 inline-block w-1/2 ">
                          <div className='font-bold'>CHECKOUT</div>
                          {checkoutDate && (
                            <input ref={d2} type="date" name="" id="" value={checkoutDate} onChange={e => { currentDates() }} />
                          )}
                        </div>
                      </div>
                      <div onClick={e => { hidden === true ? sethidden(null) : sethidden(true) }} className="guests p-2 cursor-pointer flex justify-between items-center ">
                        <div>
                          <div className='font-bold'>GUESTS</div>
                          <div>{adults + children} guests</div>
                        </div>
                        <div className='relative'>
                          {/* --------- */}
                          <div className={`${hidden === true ? "block" : "hidden"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                          </div>
                          <div className={`${hidden === true ? "hidden" : "block"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>

                          </div>

                          <div onClick={e => { e.stopPropagation() }} className={`border absolute ${hidden === true ? "hidden" : "block"}  right-0 top-12 p-4 w-72 bg-white shadow-lg rounded`}>
                            <div className="flex justify-between items-center mb-4">
                              <div>
                                <p className="text-lg font-medium">Adults</p>
                                <p className="text-sm text-gray-500">Age 13+</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => decrement(setAdults, adults)}
                                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                                >
                                  -
                                </button>
                                <span className="text-lg">{adults}</span>
                                <button
                                  onClick={() => increment(setAdults, adults)}
                                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                              <div>
                                <p className="text-lg font-medium">Children</p>
                                <p className="text-sm text-gray-500">Ages 2–12</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => decrement(setChildren, children)}
                                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                                >
                                  -
                                </button>
                                <span className="text-lg">{children}</span>
                                <button
                                  onClick={() => increment(setChildren, children)}
                                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                              <div>
                                <p className="text-lg font-medium">Infants</p>
                                <p className="text-sm text-gray-500">Under 2</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => decrement(setInfants, infants)}
                                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                                >
                                  -
                                </button>
                                <span className="text-lg">{infants}</span>
                                <button
                                  onClick={() => increment(setInfants, infants)}
                                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                              <div>
                                <p className="text-lg font-medium">Pets</p>
                                <p className="text-sm text-gray-500">Bringing a service animal?</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => decrement(setPets, pets)}
                                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                                >
                                  -
                                </button>
                                <span className="text-lg">{pets}</span>
                                <button
                                  onClick={() => increment(setPets, pets)}
                                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <p className="text-sm text-gray-500 mb-4">This place has a maximum of 2 guests, not including infants. Pets aren’t allowed.</p>
                            <button onClick={() => { sethidden(true) }} className="w-full py-2 bg-blue-500 text-white rounded">Close</button>
                          </div>
                          {/* --------- */}
                        </div>
                      </div>
                    </div>

                    <button onClick={() => { handleClick() }} className="reserve-btn mt-5">Reserve</button>
                    <p className="no-charge">You won't be charged yet</p>
                    <div className="cost-breakdown">
                      <div>
                        <span>₩{Place.price * (80 / 100)} x {dateDifference} nights</span>
                        <span>₩{totalPrice}</span>
                      </div>
                      <div className="long-stay-discount">
                        <span>Long stay discount</span>
                        <span>-₩{totalPrice * (20 / 100)}</span>
                      </div>
                    </div>
                    <div className='hor' ></div>
                    <div className="total">
                      <span>Total before taxes</span>
                      <span>₩{totalPrice - totalPrice * (20 / 100)}</span>
                    </div>
                  </div>

                </div>


              </div>

              <div>
                <div className='hor w-100' ></div>
                <div className='my-10'>
                  <div className='font-bold text-2xl'>1 review</div>
                  <div>Average rating will appear after 3 reviewe</div>
                </div>


                <div className='flex'>

                  <div className='w-1/2'>

                    <div className='flex gap-2'>
                      <div className='my-2'><img className='w-11 h-11 rounded-full' src="https://a0.muscache.com/im/pictures/user/b7411652-7877-4216-a0bf-8bdb87bd8f6c.jpg?im_w=240" alt="" /></div>
                      <div className='flex flex-col'><span className='font-bold'>Bharati</span><span>Bradford West Gwillimbury, Canada</span></div>
                    </div>
                    <div>
                      <span>⭐⭐⭐⭐⭐· April 2023 · Group trip</span>
                      <div>
                        <div className='text-balance'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores laudantium recusandae quo, porro neque pariatur dignissimos qui vel aspernatur ea optio delectus itaque ut natus reiciendis, exercitationem voluptatem provident tempore?<br />
                          The space...
                        </div>
                        <a className='font-bold underline' href="#">Show more</a>
                      </div>
                    </div>
                  </div>
                  <div className='w-1/2'>

                    <div className='flex gap-2'>
                      <div className='my-2'><img className='w-11 h-11 rounded-full' src="https://a0.muscache.com/im/pictures/user/b7411652-7877-4216-a0bf-8bdb87bd8f6c.jpg?im_w=240" alt="" /></div>
                      <div className='flex flex-col'><span className='font-bold'>Bharati</span><span>Bradford West Gwillimbury, Canada</span></div>
                    </div>
                    <div>
                      <span>⭐⭐⭐⭐⭐· April 2023 · Group trip</span>
                      <div>
                        <div className='text-balance'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores laudantium recusandae quo, porro neque pariatur dignissimos qui vel aspernatur ea optio delectus itaque ut natus reiciendis, exercitationem voluptatem provident tempore?<br />
                          The space...
                        </div>
                        <a className='font-bold underline' href="#">Show more</a>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
              <div className='hor w-100' ></div>

              <div>
                <div>
                  <h1 className='text-2xl'>Where you’ll be</h1>
                </div>
                <div className='h-96 w-100 my-5 overflow-hidden'>
                  <img className="" width={'100%'} height={'100%'} style={{ objectFit: "cover" }} src="https://a0.muscache.com/im/pictures/miso/Hosting-1013003395491995819/original/439641ed-aba6-41c0-91e4-48b071858b97.jpeg?im_w=960 " alt="" />
                </div>

                <div className='flex flex-col gap-3'>
                  <p>{Place.address}</p>
                  <div>{Place.description}<br />
                    The space...
                  </div>
                  <a className='font-bold underline' href="#">Show more</a>
                </div>


              </div>
              <div className='hor w-100' ></div>


              <div className='grid grid-cols-2' style={{ gridTemplateColumns: "35% 65%" }}>
                <div>
                  <div>

                    <div className="grid justify-between p-4 bg-white rounded-2xl shadow-md" style={{ gridTemplateColumns: "70% 30%" }}>
                      <div className="flex flex-col justify-center items-center">
                        <img src="https://a0.muscache.com/im/pictures/user/d2a8b257-f7ed-4f41-b5da-96c39c692c5e.jpg?im_w=240" alt="Host" className="w-24 h-24 rounded-full mb-2" />
                        {Owner && (<h2 className="text-lg font-bold mb-1">{Owner.name}</h2>)}
                        <p className="text-gray-600">Host</p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className=" flex justify-center flex-col items-center">
                          <h3 className="text-2xl font-bold">373</h3>
                          <p className="text-gray-600 text-sm">Reviews</p>
                        </div>
                        <div className=" flex justify-center flex-col items-center">
                          <h3 className="text-2xl font-bold">4.82</h3>
                          <p className="text-gray-600 text-sm">Rating</p>
                        </div>
                        <div className=" flex justify-center flex-col items-center">
                          <h3 className="text-2xl font-bold">6</h3>
                          <p className="text-gray-600 text-sm">Year</p>
                          <p className="text-gray-600 text-sm">Hosting</p>
                        </div>
                      </div>
                    </div>


                  </div>
                  <div className='my-5'>
                    <div className='flex gap-4 text-lg' style={{ color: "rgb(34, 34, 34)" }}>
                      <p>💼</p><p>My work: Wadi Rum Tour Guide</p>
                    </div>
                    <div className='flex gap-4 text-lg' style={{ color: "rgb(34, 34, 34)" }}>
                      <p>🌐</p><p>Speaks Arabic and English</p>
                    </div>
                    <div className='my-5 text-base text-balance'><p>I am Shaker and enjoy meeting different people from around the world. I am happy to share my<br />
                      <a className='font-bold underline' href="#">Show more</a></p>
                    </div>
                  </div>
                </div>
                <div className='p-5'>
                  <p className='font-bold text-lg'>Co Host</p>
                  <div className='flex gap-2'>
                    <div><img className='w-11 h-11 rounded-full' src="https://a0.muscache.com/im/pictures/user/User-267244391/original/06bd1896-c095-4103-b149-1ad4b5591849.jpeg?im_w=240" alt="" /></div>
                    {Owner && (<div className='flex  justify-center flex-col'><span>{Owner.name}</span></div>)}

                  </div>
                  <div className='my-5'>

                    <p className='font-bold text-lg'>Host Details</p>
                    <div>
                      <p>Response rate: 100%</p>
                      <p>Responds within an hour</p>
                    </div>
                  </div>

                  <div className=''>
                    <a href="#"><button type='button' className='font-bold  bg-black text-white inline-block py-3 px-4 rounded-xl'>Message Host</button></a>
                  </div>
                  <div className='hor w-100' ></div>
                  <div className='flex gap-2 items-center'>
                    <span>
                      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "24px", width: " 24px", fill: "rgb(227, 28, 95)", stroke: "currentcolor" }}>
                        <g><g stroke="none"><path d="m25 5 .5846837.00517475c4.2905015.07574932 8.8374917.98334075 13.644943 2.73687823l.7703733.28794702v27.3705076l-.0084766.1301365c-.0392237.2994207-.2122236.5656263-.4699074.7230756l-.1154775.0605995-11.4234694 5.0774159c.0623636-.7458456-.0433445-1.4943022-.3209346-2.2783707-.2495178-.7044496-.7667703-1.7805075-1.0418654-2.3950548-1.9094732-4.1561789-3.9589781-8.3688465-6.0912876-12.5211487l-.3317555-.6369277c-.4686141-.9115826-.8248653-1.6297768-1.3147672-2.2052384-.743401-.8737317-1.7668654-1.3549948-2.8821508-1.3549948-1.1154695 0-2.1391179.4816323-2.8828868 1.3557332-.6050254.7114646-1.0306408 1.6819288-1.6457867 2.8412431-.4956822.9653459-.9868615 1.9338929-1.47282629 2.9041739l.00159179-19.0721502.769087-.28647781c4.798406-1.75037189 9.3373349-2.65799308 13.6207364-2.73688762z" fill-opacity=".2"></path><path d="m25 1c5.5985197 0 11.5175072 1.27473768 17.7548231 3.81642897.7027419.28641855 1.1783863.94329535 1.2386823 1.69066764l.0064946.16143432v28.73197667c0 1.8999458-1.0758761 3.6285379-2.7638433 4.4721215l-.2054644.0969363-15.0427818 6.6856808c-.4614217.2050763-1.8621146.3276624-2.7955525.3430957l-.192358.0016581.0009065-1.0005013c.6483674-.0069073 1.2843321-.1330366 1.8784107-.3747752.8327784-.3388673 1.5457548-.8939986 2.0790671-1.5885618l13.2600311-5.8942194c1.023196-.4547538 1.7028179-1.4383245 1.7751735-2.5449525l.0064111-.1964822v-28.73197667l-.6916987-.27704554c-5.7517231-2.26330416-11.1871718-3.39148539-16.3083013-3.39148539-5.1211255 0-10.5565697 1.12817946-16.3082877 3.39148006l-.6917123.27707479-.00030284 24.49382405c-.68067737 1.4079172-1.34834149 2.8151846-2.00083161 4.2173468l.00113445-28.71117085c0-.81311953.4922453-1.5453083 1.24525131-1.85215622 6.23725069-2.54166294 12.15623339-3.81639863 17.75474869-3.81639863z"></path></g><path d="m15.999908 41.6930234.6867258-.8851772c1.5957359-2.0328613 2.5919668-3.8873951 2.9612752-5.511912.2804314-1.2318637.2318527-2.5167089-.4804505-3.5591688-.6801015-.9952012-1.8642067-1.5894421-3.1673665-1.5894421-1.3033438 0-2.487633.5940563-3.1675505 1.5890729-.7099111 1.039137-.761802 2.3201055-.4810025 3.5580612.3689403 1.6247015 1.3653552 3.4796045 2.9616432 5.5133888l.6867258.8851772.6447715.7192179c1.1495113 1.2599236 2.1735278 2.122579 3.2227536 2.7149739.8151649.4602182 1.6400823.7413704 2.4521191.8358878.8812245.1033783 1.7585848-.0123685 2.559765-.3383795 1.6422905-.6682672 2.8186673-2.1775911 3.0700251-3.9387151.1205267-.8438258.0264975-1.6854363-.2876078-2.572644-.2495178-.7044496-.7667703-1.7805075-1.0418654-2.3950548-1.9094732-4.1561789-3.9589781-8.3688465-6.0912876-12.5211487-.6486357-1.2222643-1.0477537-2.1388241-1.6465227-2.8421661-.743401-.8737317-1.7668654-1.3549948-2.8821508-1.3549948-1.1154695 0-2.1391179.4816323-2.8828868 1.3557332-.6050254.7114646-1.0306408 1.6819288-1.6457867 2.8412431-2.1326775 4.1534098-4.1819984 8.3660775-6.09128759 12.5211487-.28227155.6306079-.79308369 1.6933742-1.04168139 2.3948702-.3141053.8872077-.40813448 1.7288182-.28760784 2.5731978.25117384 1.7609394 1.42736664 3.2700787 3.06965711 3.9385305.81939715.3333951 1.69418134.4397272 2.55958102.3385641.81295679-.0948866 1.63805829-.3760388 2.45248709-.8360724 1.0492258-.5922103 2.0732422-1.4550503 3.2227536-2.7149739z" fill="none" stroke-width="2"></path></g>
                      </svg></span>
                    <span className='text-xs'>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</span></div>

                </div>

              </div>
              <div>
                <div className='hor w-100'></div>

                <div>
                  <div className="container mx-auto px-4 py-8">
                    <h2 className="text-3xl font-bold mb-4">Things to know</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <h3 className="text-xl font-bold mb-2">House rules</h3>
                        <p>{Place.maxGuests} guests maximum</p>
                        <button className="underline text-blue-500">Show more</button>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Safety & property</h3>
                        <p>Carbon monoxide alarm not reported</p>
                        <p>Smoke alarm not reported</p>
                        <button className="underline text-blue-500">Show more</button>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Cancellation policy</h3>
                        <p>Partial refund: Get back 50% of every night that remains 24 hours after you cancel. No refund of nights you've spent or the service fee.</p>
                        <p>Review the Host's full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.</p>
                        <button className="underline text-blue-500">Show more</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>



            </div>
          )}
          <div className=' w-full bg-[#f7f7f7]'>
            <div className='w-11/12 m-auto'>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div>
                  <h3 className="text-xl font-bold mb-2">Support</h3>
                  <ul>
                    <li><a href="#">Help Centre</a></li>
                    <li><a href="#">Get help with a safety issue</a></li>
                    <li><a href="#">AirCover</a></li>
                    <li><a href="#">Anti-discrimination</a></li>
                    <li><a href="#">Disability support</a></li>
                    <li><a href="#">Cancellation options</a></li>
                    <li><a href="#">Report neighbourhood concern</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Hosting</h3>
                  <ul>
                    <li><a href="#">Airbnb your home</a></li>
                    <li><a href="#">AirCover for Hosts</a></li>
                    <li><a href="#">Hosting resources</a></li>
                    <li><a href="#">Community forum</a></li>
                    <li><a href="#">Hosting responsibly</a></li>
                    <li><a href="#">Join a free Hosting class</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Airbnb</h3>
                  <ul>
                    <li><a href="#">Newsroom</a></li>
                    <li><a href="#">New features</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Investors</a></li>
                    <li><a href="#">Airbnb.org emergency stays</a></li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-between items-center mt-12">
                <p className="text-sm">&copy; 2024 Airbnb, Inc. <a className="underline text-blue-500" href="#">Privacy</a> <a className="underline text-blue-500" href="#">Terms</a> <a className="underline text-blue-500" href="#">Sitemap</a> <a className="underline text-blue-500" href="#">Company details</a></p>
                <div className="flex items-center">
                  <button className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 4a1 1 0 011-1v-3a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 011 1h2a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 01-1-1h-2a1 1 0 01-1-1v-3a1 1 0 011-1h3a1 1 0 011 1v-3a1 1 0 01-1-1h-3a1 1 0 00-1-1z" /></svg>
                    <span className="text-sm">English (IN)</span>
                  </button>
                  <button className="flex items-center ml-4">
                    <span className="text-sm">INR</span>
                  </button>
                  <a href="#" className="ml-4"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.953 4.572 11.976.072 9.95 1.129.858 8.24 4.02 10.185 5.771 4.055 11.976 10.84 16.121 4.055 17.871 10.185 21.02 8.24 23.953 1.129 22.894.072 11.976 4.572zm-6.893 1.448 5.984 5.984-5.984 5.984-5.984-5.984 5.984-5.984zM11.976 20.868 4.02 13.922 5.771 9.815 11.976 16.01 16.121 9.815 17.871 13.922 11.976 20.868z" /></svg></a>
                  <a href="#" className="ml-4"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-6.253-4.128-11.675-11.675-11.675-3.786 0-6.999 2.124-8.29 5.062.522.117.97 0.091 1.387-0.023 0.278-.08 0.522-.268 0.722-.533 0.19-.254 0.26-.607 0.164-.958-0.096-.345-0.347-.705-0.631-1.068-0.284-.363-0.612-.645-0.888-.865-0.276-.22-0.593-.37-0.955-.494-0.362-.124-0.743-.088-1.105 0.087-0.362 0.175-0.65 0.405-0.865 0.687-0.215 0.282-0.334 0.654-0.23 1.016 0.104 0.362 0.39 0.65 0.748 0.812 0.358 0.162 0.781 0.183 1.149-0.014 0.368-0.197 0.614-0.591 0.748-0.959 0.134-0.368 0.049-0.777-0.164-1.149-0.213-0.372-0.545-0.618-0.888-0.812-0.343-0.195-0.777-0.208-1.171 0.021-0.394 0.23-0.664 0.607-0.748 0.959-0.084 0.368 0.015 0.777 0.164 1.149 0.15 0.372 0.445 0.618 0.888 0.812 0.343 0.195 0.777 0.208 1.171-0.021 0.394-0.23 0.664-0.607 0.748-0.959 0.084-0.368-0.015-0.777-0.164-1.149-0.15-0.372-0.445-0.618-0.888-0.812-0.343-0.195-0.777-0.208-1.171 0.021-0.394 0.23-0.664 0.607-0.748 0.959-0.134 0.368-0.049 0.777 0.164 1.149 0.213 0.372 0.545 0.618 0.888 0.812 0.284 0.363 0.612 0.645 0.888 0.865 0.276 0.22 0.593 0.37 0.955 0.494 0.362 0.124 0.743 0.088 1.105-0.087 0.362-0.175 0.65-0.405 0.865-0.687 0.215-0.282 0.334-0.654 0.23-1.016-0.104-0.362-0.39-0.65-0.748-0.812-0.358-0.162-0.781-0.183-1.149 0.014-0.368 0.197-0.614 0.591-0.748 0.959-0.134 0.368-0.049 0.777 0.164 1.149 0.213 0.372 0.545 0.618 0.888 0.812 0.343 0.195 0.777 0.208 1.171-0.021 0.394-0.23 0.664-0.607 0.748-0.959 0.084-0.368-0.015-0.777-0.164-1.149-0.15-0.372-0.445-0.618-0.888-0.812-0.284-0.363-0.612-0.645-0.888-0.865-0.276-0.22-0.593-0.37-0.955-0.494-0.362-0.124-0.743-0.088-1.105 0.087-0.362 0.175-0.65 0.405-0.865 0.687-0.215 0.282-0.334 0.654-0.23 1.016 0.104 0.362 0.39 0.65 0.748 0.812 0.358 0.162 0.781 0.183 1.149-0.014 0.368-0.197 0.614-0.591 0.748-0.959 0.134-0.368 0.049-0.777-0.164-1.149-0.213-0.372-0.545-0.618-0.888-0.812-0.343-0.195-0.777-0.208-1.171 0.021-0.394 0.23-0.664 0.607-0.748 0.959-0.084 0.368 0.015 0.777 0.164 1.149 0.15 0.372 0.445 0.618 0.888 0.812 0.284 0.363 0.612 0.645 0.888 0.865 0.276 0.22 0.593 0.37 0.955 0.494 0.362 0.124 0.743 0.088 1.105-0.087 0.362-0.175 0.65-0.405 0.865-0.687 0.215-0.282 0.334-0.654 0.23-1.016-0.104-0.362-0.39-0.65-0.748-0.812-0.358-0.162-0.781-0.183-1.149 0.014-0.368 0.197-0.614 0.591-0.748 0.959-0.134 0.368-0.049 0.777 0.164 1.149 0.213 0.372 0.545 0.618 0.888 0.812 0.343 0.195 0.777 0.208 1.171-0.021z" /></svg></a>
                  <a href="#" className="ml-4"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.25c-4.57 0-8.29 3.72-8.29 8.29 0 4.57 3.72 8.29 8.29 8.29 4.57 0 8.29-3.72 8.29-8.29 0-4.57-3.72-8.29-8.29-8.29zm0 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" /></svg></a>
                  <a href="#" className="ml-4"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.75c-4.57 0-8.29-3.72-8.29-8.29 0-4.57 3.72-8.29 8.29-8.29 4.57 0 8.29 3.72 8.29 8.29 0 4.57-3.72 8.29-8.29 8.29zm0-15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" /></svg></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default PlacesPage
