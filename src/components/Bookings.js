import React from 'react'
import Account from './Account'
import ShowBooking from './ShowBookings'
function Bookings() {
  return (
    <div>

      <Account />
      <div className='flex justify-center items-start mt-10 w-100 h-[100vh]'>
        <ShowBooking />
      </div>
    </div>
  )
}

export default Bookings