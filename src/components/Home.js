import React, { useRef, useContext, useEffect, useState } from 'react'
import Nav from './Nav'
import UserContext from "../context/Users/UserContext";
import UserState from '../context/Users/UserState';
import { Link,useLocation } from 'react-router-dom';

// import './script'

function Home() {
  const location = useLocation();
  const context = useContext(UserContext);

  const { user, login, fetchUser } = context;
  const [Places, setPlaces] = useState([])

  const fetchPlaces = async () => {
    const data = await fetch('http://localhost:5000/places')
    if (data) {
      setPlaces(await data.json())
    }
  }

  useEffect(() => {
    fetchPlaces()
    fetchUser()
  }, [])

  return (
    <div>
      <Nav path={location.pathname} />
      <div className='horz my-2'>
      </div>
      <div className='flex items-center'>
        <div className='mx-7 border border-gray-500 rounded-full p-1 arrows left'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div className='flex buttons overflow-x-scroll ' >
          <div>
            <img src="https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png" height="24px" width="24px" alt="" />
            <p>Icons</p>
          </div>
          <div>
            <img src="	https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg" height="24px" width="24px" alt="" />
            <p>Amazing Pool</p>
          </div>
          <div>
            <img src="https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg" height="24px" width="24px" alt="" />
            <p>Amazing View</p>
          </div>
          <div>
            <img src="https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg" height="24px" width="24px" alt="" />
            <p>Farms</p>
          </div>
          <div>
            <img src="https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg" height="24px" width="24px" alt="" />
            <p>Beach</p>
          </div>
          <div>
            <img src="https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg" height="24px" width="24px" alt="" />
            <p>Camping</p>
          </div>
          <div>
            <img src="https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg" height="24px" width="24px" alt="" />
            <p>Lakefront</p>
          </div>
          <div>
            <img src="https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg" height="24px" width="24px" alt="" />
            <p>OMG!</p>
          </div>
          <div>
            <img src="https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg" height="24px" width="24px" alt="" />
            <p>Beachfront</p>
          </div>
          <div>
            <img src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg" height="24px" width="24px" alt="" />
            <p>Cabins</p>
          </div>
          <div>
            <img src="	https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg" height="24px" width="24px" alt="" />
            <p>Treehouse</p>
          </div>
          <div>
            <img src="https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg" height="24px" width="24px" alt="" />
            <p>Luxe</p>
          </div>
          <div>
            <img src="https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg" height="24px" width="24px" alt="" />
            <p>Countryside</p>
          </div>
          <div>
            <img src="	https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg" height="24px" width="24px" alt="" />
            <p>Castle</p>
          </div>
          <div>
            <img src="	https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg" height="24px" width="24px" alt="" />
            <p>Castle</p>
          </div>
          <div>
            <img src="	https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg" height="24px" width="24px" alt="" />
            <p>Castle</p>
          </div>
          <div>
            <img src="	https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg" height="24px" width="24px" alt="" />
            <p>Castle</p>
          </div>

        </div>
        <div className='mx-7 border border-gray-500 rounded-full p-1 arrows right' >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>

      <div className='flex justify-center'>
      <div className='w-[90vw] grid grid-col-2 md:grid-cols-3 lg:grid-cols-4'>
        {Places.length > 0 && Places.map(place => {
          return (<Link to={'/places/' + place._id}><div className="max-w-xs border rounded-lg overflow-hidden shadow-lg m-4">
            <img
              src={place.photos[0]}
              alt="Wadi Rum, Jordan"
              className="w-full"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium">{place.title}</h3>
              <p className="text-gray-500">{place.address}</p>
              <p className="text-gray-500">8-13 Jul</p>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-100 border-t">
              <div className="text-gray-700 text-lg">${place.price} night</div>
              <div className="flex items-center text-yellow-500">
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .288l2.833 8.718H24l-7.418 5.396 2.833 8.718L12 17.712 4.585 23.12l2.833-8.718L0 9.006h9.167z" />
                </svg>
                <span className="ml-2 text-gray-700">4.85</span>
              </div>
            </div>
          </div></Link>)
        })}
      </div>
      </div>

      <div className="flex justify-between fixed  bottom-0 bg-white p-5 w-[100vw]">
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
  )
}

export default Home
