import { Button } from '@/components/ui/button'
import { BedDouble, MapPin } from 'lucide-react'
import React from 'react'

const SingleHotelCard = ({ featureHotel }) => {
  console.log(featureHotel);

  return (
    <div className="bg-white [box-shadow:0_4px_12px_-5px_rgba(0,0,0,0.4)] w-64 h-72 rounded-lg overflow-hidden mx-auto mt-4 border-red-500">
      <div className="">
        <img
          src={
            featureHotel.hotelImages[0] ||
            "https://readymadeui.com/Imagination.webp"
          }
          className="w-full h-[170px] object-cover"
          alt="Card image"
        />
      </div>

      <div className="p-3 border-green-500">
        <h3 className="text-gray-700 text-[16px] font-semibold">
          {featureHotel.hotelName || "Hotel Name"}
        </h3>
        <p className="mt-0.5 text-sm text-slate-500 leading-relaxed flex items-center">
          <MapPin size={15} />
          {featureHotel.address || "Goa"}
        </p>
        <div className="flex items-center justify-between border-orange-500 mt-2">
          <p className="flex justify-center items-center text-slate-700 border-red-500 gap-2 text-sm">
            <BedDouble size={15} /> {featureHotel.hotelCategory || "450"}
          </p>
          <Button
            type="button"
            variant="outline"
            className="px-5 py-2.5 rounded-lg text-gray-700 font-medium tracking-wider cursor-pointer text-[13px]"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleHotelCard;
