import React from "react";
import { MapPin, StarIcon, Wifi } from "lucide-react";
import homeImg from "../assets/home.jpeg";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const HotelDetail = () => {
  return (
    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Room Details */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <h1 className="text-3xl md:text-4xl">
          hotel name <span className="text-sm">room type</span>
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
        <span>hotel address</span>
      </div>
      {/* Room images */}
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full">
          <img
            src={homeImg}
            alt="mainHomeImg"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {Array.from({ length: 3 }).map((elm, index) => (
            <img
              src={homeImg}
              alt="Room Image"
              className={`w-full rounded-xl shadow-md object-cover cursor-pointer`}
            />
          ))}
        </div>
      </div>

      {/* Room Highliights */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl">
            Experience Luxury Like Never Before
          </h1>
          <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
              <Wifi />
              <p className="text-xs">Free Wifi</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
              <Wifi />
              <p className="text-xs">Free Wifi</p>
            </div>
          </div>
        </div>
        {/* Room Price */}
        <p className="text-2xl font-medium">$450 /night</p>
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
            <AvatarImage
              src={"https://github.com/shadcn.png"}
              alt="@shadcn"
              // className="h-10 w-10"
            />
            <AvatarFallback className="text-lg">CN</AvatarFallback>
          </Avatar>
          <div className="text-lg md:text-xl">
            <p>Hosted by (owner name)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
