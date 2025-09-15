import React from "react";
import homeImg from "../assets/home.jpeg";
import { useNavigate } from "react-router-dom";
import { MapPin, StarIcon, Wifi } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";


const categories = [
  {id: "single bed", label: "Single bed"},
  {id: "double bed", label: "Double bed"},
  {id: "family suite", label: "Family suite"},
  {id: "luxury room", label: "Luxury Room"},
]

// all hotels will be listed here

const HotelList = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col-reverse lg:flex-row items-baseline justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfire text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>

        {Array.from({ length: 3 }).map((room, id) => {
          return (
            <div
              key={id}
              className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
            >
              <img
                src={homeImg}
                alt="hotel-img"
                title="View room details"
                className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
                onClick={() => {
                  navigate(`/hotel/${id}`);
                  scrollTo(0, 0);
                }}
              />
              <div className="md:1/2 flex flex-col gap-2">
                <p className="text-gray-500">city</p>
                <p
                  className="text-gray-800 text-3xl cursor-pointer"
                  onClick={() => {
                    navigate(`/hotel/${id}`);
                    scrollTo(0, 0);
                  }}
                >
                  Hotel name
                </p>
                <div className="flex items-center">
                  <StarIcon size={15} />
                  <p className="ml-2">200+ reviews</p>
                </div>
                <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                  <MapPin size={15} />
                  <span>hotel address</span>
                </div>
                {/* Room amenities */}
                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f5f5f5]/70">
                    <Wifi />
                    <p className="text-xs">Free Wifi</p>
                    {/* <img src="" alt="" /> */}
                  </div>
                </div>
                {/* Room Price Per Night */}
                <p className="text-[20px] font-medium text-gray-700 mt-[-30px]">
                  $450 /night
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div>
        <p className="font-semibold text-lg md:text-xl">FILTERS</p>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Separator className="my-4" />
        <div>
          {categories.map((category) => (
            <div className="flex items-center space-x-2 my-2" key={category.id}>
              <Checkbox id={category.id} />
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelList;
