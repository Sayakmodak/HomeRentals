import React from "react";
import home from "../assets/home.jpeg";
import { MapIcon, User } from "lucide-react";
import { useParams } from "react-router-dom";
import { useShowMyBoookingsQuery } from "@/features/api/bookingApi.js";

const MyBooking = () => {
  const params = useParams();
  const { userId } = params;

  const { data, isLoading, isSuccess, isError, error } =
    useShowMyBoookingsQuery(userId);
  // console.log(data);

  if (isLoading) {
    return <div className="mt-20">Loading...</div>;
  }

  const booking = data?.booking;
  // console.log(booking);

  return (
    <div className="px-4 md:py-35 md:px-16 lg:px-24 xl:px-32">
      <div>
        <h1 className="text-3xl md:text-4xl">My Bookings</h1>
        <p className="mb-2 mt-2 text-[18px]">
          Easily manage your past, current, and upcoming hotel reservation in
          one place. <br /> Plan your trips seamlessly with just a few clicks
        </p>

        <div className="max-w-6xl mt-8 w-full text-gray-900 border-red-500">
          <div className="hidden md:grid md:grid-cols-2 w-full border-b border-gray-300 py-3 font-medium text-[18px]">
            <div className="">Hotels</div>
            <div className="">Date and Timings</div>
          </div>
        </div>

        {booking?.map((hotel, index) => {
          return (
            <div
              className="grid md:grid-cols-2 w-full border-b border-gray-300 py-6 first:border-t"
              key={index}
            >
              <div className="border-green-600 flex flex-col md:flex-row">
                <img
                  src={hotel?.room?.roomImages[0] || home}
                  alt="hotel-img"
                  className="min-mid:w-44 rounded shadow object-cover h-[120px]"
                />
                <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                  <p className="text-2xl">
                    {hotel?.room?.roomName || "Hotel Name"}
                    <span className="text-sm">
                      {" "}
                      ({hotel?.room?.roomCategory || "room type"})
                    </span>
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapIcon size={16} />
                    <span>{hotel?.hotel?.address || "address"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <User size={16} />
                    <span>Guests: {hotel?.guest || "5"}</span>
                  </div>
                  <p className="text-base">
                    Total: {hotel?.totalPrice || $3999}
                  </p>
                </div>
              </div>

              <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8 border-red-500 ml-[-30px]">
                <div>
                  <p>Check-In:</p>
                  <p className="text-gray-500">
                    {new Date(hotel?.checkInDate).toDateString() ||
                      "Thu Jun 2030"}
                  </p>
                </div>
                <div>
                  <p>Check-Out:</p>
                  <p className="text-gray-500">
                    {new Date(hotel?.checkOutDate).toDateString() ||
                      "Wed Jul 2030"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* <div className="grid md:grid-cols-2 w-full border-b border-gray-300 py-6 first:border-t">
          <div className="border-green-600 flex flex-col md:flex-row">
            <img
              src={home}
              alt="hotel-img"
              className="min-mid:w-44 rounded shadow object-cover h-[120px]"
            />
            <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
              <p className="text-2xl">
                Hotel Name
                <span className="text-sm"> (room type)</span>
              </p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapIcon size={16} />
                <span>address</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <User size={16} />
                <span>Guests: 5</span>
              </div>
              <p className="text-base">Total: $2999</p>
            </div>
          </div>

          <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8 border-red-500 ml-[-30px]">
            <div>
              <p>Check-In:</p>
              <p className="text-gray-500">Thu Jun 2030</p>
            </div>
            <div>
              <p>Check-Out:</p>
              <p className="text-gray-500">Wed Jul 2030</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MyBooking;
