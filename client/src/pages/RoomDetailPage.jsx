import React, { useEffect, useState } from 'react'
import { CupSoda, MapPin, MountainSnow, Rows4, StarIcon, Waves, Wifi } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFetchSpecificRoomQuery } from '@/features/api/roomApi';
import { useParams } from 'react-router-dom';
import { useGetHotelByIdQuery } from '@/features/api/hotelApi';


const roomAmenities = {
  "free wifi" : <Wifi />,
  "free breakfast": <CupSoda />,
  "free room service": <Rows4 />,
  "pool access": <Waves />,
  "mountain view": <MountainSnow />,
}

const RoomDetailPage = () => {
  const params = useParams();
  const { roomId, hotelId} = params;
  const [mainImage, setMainImage] = useState();

  const focusImage = (img) =>{
    setMainImage(img);
  }

  const { data, isLoading, isSuccess, isError, error } =
    useFetchSpecificRoomQuery(roomId);

  const {data: hotelData, isLoading: hotelIsLoading, isSuccess: hotelSuccess, isError: hotelError} = useGetHotelByIdQuery(hotelId);

  // console.log(data?.room);
  const hotel = hotelData?.hotel;
  const room = data?.room;
  useEffect(()=>{
    setMainImage(room?.roomImages[0]);
  }, [room])


  if(isLoading){
    return <p className='mt-50'>Loading...</p>
  }

  return (
    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Room Detail */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <h1 className="text-3xl md:text-4xl">
          {room?.roomName || "room name"}{" "}
          <span className="text-sm">{room?.roomCategory || "room type"}</span>
        </h1>
        <p className="text-xs py-1.5 px-3 rounded-full text-white bg-orange-500">
          20% off
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-2">
        <StarIcon size={15} />
        <p className="ml-2">200+ reviews</p>
      </div>

      {/* Room address */}
      <div className="flex items-center gap-1 text-gray-500 mt-2">
        <MapPin size={15} />
        <span>{hotel?.address || "room address"}</span>
      </div>

      {/* Room images */}
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full">
          <img
            src={mainImage}
            alt="mainHomeImg"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room.roomImages.map((elm, index) => (
            <img
              onClick={() => focusImage(elm)}
              key={index}
              src={elm}
              alt="Room Image"
              className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${elm === mainImage ? "border border-blue-400" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Room Highlights */}
      <div className="flex flex-col items-center border md:flex-row md:justify-between mt-20 border-red-500">
        <div className="flex flex-col items-center border-pink-500">
          {room.roomDesc && (
            <h1
              className="text-3xl md:text-4xl"
              dangerouslySetInnerHTML={{ __html: room.roomDesc }}
            />
          )}

          {/* Bug */}
          <div className="flex flex-wrap items-center mt-3 mb-6 gap-4 border border-green-600">
            {room?.amenities.map((elm, index) => {
              return (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                  key={index}
                >
                  {roomAmenities[elm.toLowerCase()]}
                  <p className="text-xs">{elm || "Free Wifi"}</p>
                </div>
              );
            })}
          </div>
        </div>
        {/* Room Price */}
        <p className="text-2xl font-medium">${room?.pricePerNight} /night</p>
      </div>

      {/* Checkin Checkout form */}
      <form
        action=""
        className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
      >
        <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
          <div className="flex flex-col">
            <label htmlFor="checkindate" className="font-medium">
              Check-In
            </label>
            <input
              type="date"
              id="checkindate"
              placeholder="Check-In"
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            />
          </div>
          <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
          <div className="flex flex-col">
            <label htmlFor="checkoutdate" className="font-medium">
              Check-Out
            </label>
            <input
              type="date"
              id="checkoutdate"
              placeholder="Check-Out"
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            />
          </div>
          <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
          <div className="flex flex-col">
            <label htmlFor="guests" className="font-medium">
              Guests
            </label>
            <input
              type="number"
              id="guests"
              placeholder="Guests"
              className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#615fff] hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
        >
          Check Availability
        </button>
      </form>

      {/* Hosted By */}
      <div className="flex flex-col items-start gap-4 mt-10">
        <div className="flex gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={hotel?.owner?.profileImg || "https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback className="text-lg">CN</AvatarFallback>
          </Avatar>

          <div className="text-lg md:text-xl">
            <p>Hosted by {hotel?.owner?.name.toLowerCase().split(" ").map((word)=> word.charAt(0).toUpperCase() + word.slice(1))}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage
