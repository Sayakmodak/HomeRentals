import React, { useEffect, useState } from 'react'
import  home  from '../assets/home.jpeg';
import { CupSoda, Loader2, Rows4, Wifi, Waves, MountainSnow} from "lucide-react";
import { useBookRoomMutation } from '@/features/api/bookingApi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFetchSpecificRoomQuery } from '@/features/api/roomApi';


const amenityIcons = {
  "free wifi": <Wifi />,
  "free breakfast": <CupSoda />,
  "free room service": <Rows4 />,
  "pool access": <Waves />,
  "mountain view": <MountainSnow />,
};

const ReservationPage = () => {
  const params = useParams();
  const {hotelId, roomId} = params;
  const [userData, setUserData] = useState({
    name: "",
    checkInDate: "",
    checkOutDate: "",
    guest: ""
  });

  const [formData, {data, isLoading, isSuccess, isError, error}] = useBookRoomMutation();
  const {data: roomData, isLoading: roomIsLoading, isSuccess: roomIsSuccess, isError: roomIsError, error: roomError} = useFetchSpecificRoomQuery(roomId);

  const handleOnChange = (e) => {
    const {name, value} = e.target;

    setUserData((prev)=>{
      return {...prev, [name]: value};
    })
  }

  const handleReserve = async () =>{
    // console.log(userData);
    if(!userData.name || !userData.checkInDate || !userData.checkOutDate || !userData.guest){
      toast.error("All fields are required!");
      return;
    }
    if(userData.checkInDate > userData.checkOutDate){
      toast.error("Check In Date must be greater than Check Out Date!");
      return;
    }
    await formData({ ...userData, hotelId, roomId});   // { {userData}, hotelId, roomId } so, need to spread it like this {...userData, hotelId, roomId}
  }

  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message || "Your room has been confirmed");
      // console.log(data);
    }
    if(isError || error){
      // console.log(error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [data, isSuccess, isError])

  if(roomIsLoading){
    return <p className="mt-50">Loading...</p>;
  }
  console.log(roomData);
  const room = roomData?.room;
  
  return (
    <div className="px-4 md:py-35 md:px-16 lg:px-24 xl:px-32">
      <h2 className="mb-5 text-3xl font-semibold">
        {room?.roomName || "Hotel Name like This"}
      </h2>

      <div className="flex gap-5">
        {/* Customer Details */}
        <div className="border border-gray-500 w-[1800px] rounded-2xl h-[600px]">
          <div className="border-blue-800 m-2 p-3 rounded-lg bg-[#F3F4F6]">
            <h2 className="font-medium text-lg">
              Who's the lead guest, Your details
            </h2>
            <p className="mt-4">Name</p>
            <input
              type="text"
              className="border border-gray-300 mt-1 rounded p-1 w-80"
              name="name"
              onChange={handleOnChange}
              value={userData.name}
            />

            <div>
              <p className="mt-4">Check In Date</p>
              <input
                type="date"
                className="w-80 rounded border border-gray-300 px-3 py-1.5 mt-1.5 text-sm outline-none"
                name="checkInDate"
                onChange={handleOnChange}
                value={userData.checkInDate}
              />
            </div>
            <div>
              <p className="mt-4">Check Out Date</p>
              <input
                type="date"
                className="w-80 rounded border border-gray-300 px-3 py-1.5 mt-1.5 text-sm outline-none"
                name="checkOutDate"
                onChange={handleOnChange}
                value={userData.checkOutDate}
              />
            </div>
            <div>
              <p className="mt-4">Guest</p>
              <input
                type="text"
                className="w-80 rounded border border-gray-300 px-3 py-1.5 mt-1.5 text-sm outline-none"
                name="guest"
                onChange={handleOnChange}
                value={userData.guest}
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="border-yellow-500 m-2 p-3 rounded-lg bg-[#F3F4F6]">
            <h2 className="font-medium text-lg mb-2">Property Highlights</h2>

            <div className="flex items-center gap-2">
              {
                room?.amenities.map((elm, index)=>{
                  return (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100" key={index}>
                      {amenityIcons[elm.toLowerCase()]}
                      <p>{elm}</p>
                    </div>
                  );
                })
              }
            </div>
          </div>

          <div>
            <button
              onClick={handleReserve}
              className="hover:bg-primary-dull active:scale-95 transition-all bg-[#615fff]  text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 cursor-pointer text-lg ml-2 mt-5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 w-2" />
                  Please wait
                </>
              ) : (
                <>
                  <p>Reserve</p>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="border border-gray-700 rounded-2xl overflow-hidden">
          <img src={home} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ReservationPage
