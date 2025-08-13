import React from 'react'
import Hero from './Hero';
import HotelCards from './HotelCards';
import TestimonialSection from './TestimonialSection';

const HomePage = () => {
  return (
    <div className='border-red-500'>
      <Hero/>
      <HotelCards />
      <TestimonialSection/>
    </div>
  )
}

export default HomePage
