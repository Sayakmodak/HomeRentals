import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import React from 'react'

const HotelSingleCard = () => {
  return (
      <div className="bg-white [box-shadow:0_4px_12px_-5px_rgba(0,0,0,0.4)] w-64 h-72 rounded-lg overflow-hidden mx-auto mt-4 border-red-500">
      <div className="">
        <img src="https://readymadeui.com/Imagination.webp" className="w-full h-full object-cover" alt="Card image" />
      </div>

      <div className="p-3 border-green-500">
        <h3 className="text-gray-700 text-[16px] font-semibold">Hotel Name</h3>
        <p className="mt-0.5 text-sm text-slate-500 leading-relaxed flex items-center"><MapPin size={15}/>Goa</p>
        <div className='flex items-center justify-between border-orange-500 mt-2'>
          <p>$450 <span className='text-[#888a8c] text-[13px]'>/night</span></p>
        <Button type="button" variant="outline"
          className="px-5 py-2.5 rounded-lg text-gray-700 font-medium tracking-wider cursor-pointer text-[13px]">View Details</Button>
        </div>
      </div>
    </div>
  )
}

export default HotelSingleCard
