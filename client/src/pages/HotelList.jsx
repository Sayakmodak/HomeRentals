import React from 'react'
import homeImg from '../assets/home.jpeg';
import { useNavigate } from 'react-router-dom';
import { MapPin, StarIcon } from 'lucide-react';

const HotelList = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col-reverse lg:flex-row items-center justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      <div>
        <div className='flex flex-col items-start text-left'>
          <h1 className='font-playfire text-4xl md:text-[40px]'>Hotel Rooms</h1>
          <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</p>
        </div>

        {
          Array.from({length: 5}).map((id, room)=>{
            return <div key={id}>
              <img src={homeImg} alt="hotel-img" title='View room details' className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer' onClick={()=> {navigate(`/rooms/${id}`); scrollTo(0,0)}}/>
              <div className='md:1/2 flex flex-col gap-2'>
                <p className='text-gray-500'>city</p>
                <p className='text-gray-800 text-3xl cursor-pointer' onClick={()=> {navigate(`/rooms/${room.id}`); scrollTo(0,0)}}>Hotel name</p>
                <div className='flex items-center'>
                  <StarIcon />
                  <p className='ml-2'>200+ reviews</p>
                </div>
                <div>
                  <MapPin size={15}/>
                  <span>hotel address</span>
                </div>
              </div>
            </div>
          })
        }
      </div>
      {/* Filters */}
      <div>

      </div>
    </div>
  )
}

export default HotelList
