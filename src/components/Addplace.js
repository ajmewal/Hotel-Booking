import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Account from './Account'

function Addplace() {


    const ref = useRef(null)
    const [title, settitle] = useState('')
    const [address, setaddress] = useState('')
    const [addPhoto, setAddPhoto] = useState([])
    const [photoLink, setphotoLink] = useState([])
    const [description, setdescription] = useState('')
    const [perks, setperks] = useState([])
    const [extrainfo, setextrainfo] = useState('')
    const [checkin, setcheckin] = useState('')
    const [checkout, setcheckout] = useState('')
    const [maxguest, setmaxguest] = useState(1)
    const [price, setprice] = useState()
    const perk = ['wifi', 'freeparking', 'tv', 'pets', 'privente']
    const [nextId, setnextId] = useState(0)
    // let nextId = 0;

    const onChange = (e) => {
        if (e.target.name === 'title') {
            settitle(e.target.value)
        } else if (e.target.name === 'address') {
            setaddress(e.target.value)
        } else if (e.target.name === 'description') {
            setdescription(e.target.value)
        } else if (e.target.name === 'extrainfo') {
            setextrainfo(e.target.value)
        } else if (e.target.name === 'checkin') {
            setcheckin(e.target.value)
        } else if (e.target.name === 'checkout') {
            setcheckout(e.target.value)
        } else if (e.target.name === 'guest') {
            setmaxguest(e.target.value)
        } else if (e.target.name === 'price') {
            setprice(e.target.value)
        } else {
            if (perks.includes(e.target.value)) {
                perks.splice(perks.indexOf(e.target.value), 1)
            } else {
                for (let i = 0; i < perk.length; i++) {
                    if (perk[i] === e.target.name) {
                        perks.push(e.target.value)
                    }
                }

            }
        }

    }

    const addPhotoByLink = async () => {
        const img = ref.current.value;
        ref.current.value = ''
        console.log(JSON.stringify({ link: img }))
        if (img) {
            const data = await fetch('http://localhost:5000/upload-by-image', {
                method: 'POST',
                body: JSON.stringify({
                    links: img
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (data) {
                const imgs = await data.json()
                console.log(imgs)
                setAddPhoto([
                    ...addPhoto,
                    { id: nextId, name: 'http://localhost:5000' + imgs }
                ]);
                setnextId(nextId + 1)
                addPhoto.map((e) => {

                    console.log(e.name)
                })
            }
        } else {
            console.log('not uploaded')
        }
    }


    const addimg = () => {
        const img = ref.current.value;
        ref.current.value = ''
        setphotoLink([...photoLink, img])
    }


    const addNewPlace = async () => {
        // ev.preventDefault();
        const data = await fetch('http://localhost:5000/add-places', {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify({
                title: title,
                address: address,
                addPhoto: addPhoto,
                description: description,
                perks: perks,
                extrainfo: extrainfo,
                checkin: checkin,
                checkout: checkout,
                maxguest: maxguest,
                price:price
            }),
            headers: { 'Content-type': "application/json" }
        })
        console.log(await data.json())
    }

    const uploadPhoto = (ev) => {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        fetch('http://localhost:5000/upload', {
            method: "POST",
            credentials: 'include',
            body: data,
        }).then(async response => {
            const d = await response.json();
            setAddPhoto(addPhoto => { return [...addPhoto, ...d] })

        })

    }

    const  deleteImage = async (index) =>{
        const img = addPhoto.filter(function(item,key){
            return key===index
        })
        console.log(JSON.stringify({ link: img }))
        if (img) {
            const data = await fetch('http://localhost:5000/deleteimage', {
                method: 'POST',
                body: JSON.stringify({
                    links: img
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (data) {
                setAddPhoto(addPhoto => {return addPhoto.filter(function(item,key){return key!==index})})
                const imgs = await data.json()
                console.log(imgs)
                
            }
        } else {
            console.log('Not Deleted')
        }
        
    }

    return (
        <div>
            <Account />
            <div className='w-100'>
                <div className='flex justify-end w-4/5 mt-10'>
                    <Link to={'/account/places'}>
                        <button type="button" className=' py-2 px-4 bg-primaryColor text-white rounded-full' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                        </button></Link>
                </div>

                <div className='flex justify-center'>



                    <form className='w-3/4  mt-10'>
                        <label htmlFor="title" className='font-semibold'>Title</label>
                        <input type="text" name="title" onChange={onChange} id="" placeholder='Title' />
                        <label htmlFor="address" className='font-semibold'>Address</label>
                        <input type="text" name="address" onChange={onChange} id="" placeholder='Address' />
                        <h2 className='font-semibold m-2 text-2xl'>Photos</h2>
                        <div className='flex items-center'>
                            <input className='w-[80%] test' type="text" name="photoLink" id="" ref={ref} placeholder='Add From Link....jpg' />
                            <button type='button' disabled={(addPhoto.length > 10) ? true : false} className=' bg-gray-400 h-11 rounded-2xl w-[20%]' onClick={() => { addPhotoByLink() }} >Add Photo</button>
                        </div>
                        <div className='mt-2 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3'>
                            {addPhoto.length > 0 &&
                                addPhoto.map((e,index) => (
                                    <div className='h-[330px] m-2 relative rounded-xl shadow-xl' key={index}>
                                        <img src={e} className=' h-[330px] w-full rounded-3xl' alt="" />
                                        <div onClick={()=>{deleteImage(index)}} className=' cursor-pointer absolute shadow-xl border p-2 border-gray-200 hover:bg-gray-200  rounded-full right-4 bottom-5 text-black'><svg xmlns="http://www.w3.org/2000/svg" fill="transparent"  viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
                                            <path fill='' stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        </div>
                                    </div>
                                ))
                            }
                            <label type='button' className='flex cursor-pointer justify-center items-center gap-1 h-[308px] m-2 border bg-transparent rounded-3xl  text-[45px] text-gray-600'>
                                <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                                <svg xmlns="http://www.w3.org/2000/svg" height={'200px'} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                                Upload
                            </label>

                        </div>
                        <label htmlFor="description" className='font-semibold'>Description</label>
                        <textarea className='block border border-gray-400 p-2 w-full' type="text" onChange={onChange} name="description" id="" rows={8} placeholder='Description' />

                        <label htmlFor="address" className='font-semibold'>Perks</label>
                        <div className='grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>
                            <label className='border m-0 rounded-2xl p-2 border-gray-400 text-xl'>
                                <input type='checkbox' name='wifi' value={'WIFI'} onChange={onChange} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                                </svg>

                                <span>WIFI</span>
                            </label>
                            <label className='border m-0 rounded-2xl p-2 border-gray-400 text-xl'>
                                <input type='checkbox' name='freeparking' value={'Free Parking'} onChange={onChange} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>
                                <span>Free Parking</span>

                            </label>
                            <label className='border m-0 rounded-2xl p-2 border-gray-400 text-xl'>
                                <input type='checkbox' name='tv' value={'TV'} onChange={onChange} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>

                                <span>TV</span>
                            </label>
                            <label className='border m-0 rounded-2xl p-2 border-gray-400 text-xl'>
                                <input type='checkbox' name='pets' value={'Pets'} onChange={onChange} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
                                </svg>


                                <span>Pets</span>
                            </label>
                            <label className='border m-0 rounded-2xl p-2 border-gray-400 text-xl'>
                                <input type='checkbox' name='privente' value={'Private Enterance'} onChange={onChange} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                </svg>
                                <span>Private Enterance</span>
                            </label>

                        </div>
                        <label htmlFor="extrainfo" className='font-semibold'>Extra Info</label>
                        <input className='' type="text" name="extrainfo" onChange={onChange} id="" placeholder='Extra Info' />

                        <label htmlFor="extrainfo" className='font-semibold'>Check in&out times</label>
                        <div className='grid grid-col-3 gap-2 sm:grid-col-3 lg:grid-col-3 grid-flow-col'>
                            <div className=''>
                                <label className='text-lg'>Check In time</label>
                                <input type="text" name='checkin' onChange={onChange} placeholder='14:00' />
                            </div>
                            <div className=''>
                                <label className='text-lg'>Check Out time</label>
                                <input type="text" name='checkout' placeholder='14:00' onChange={onChange} />
                            </div>
                            <div className=''>
                                <label className='text-lg'>Max Guest</label>
                                <input type="text" name='guest' placeholder='14:00' onChange={onChange} />
                            </div>
                            
                            <div className=''>
                                <label className='text-lg'>Price</label>
                                <input type="text" name='price' placeholder='xxxx' onChange={onChange} />
                            </div>
                            
                        </div>
                        <div className='mb-10'>
                            <Link to={'/account/places'}><button className='bg-primaryColor text-white w-full mt-2 my-2  py-2 px-4 rounded-full' type='button' onClick={addNewPlace}>Save</button></Link>
                            <Link to={'/account/places'}><button type="button" className='flex justify-center py-2 px-4 w-full border border-gray-300 rounded-full' >
                                Close
                            </button></Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Addplace
