import React from "react";
import HotelSingleCard from "./HotelSingleCard";
import { Button } from "@/components/ui/button";

const HotelCards = () => {
  const arr = [1, 2, 3, 4];

  return (
    <div className="bg-[#f5f8fb] pt-20 flex items-center flex-col pb-10">
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold text-[#252525]">Featured Hotels</h1>
        <p className="text-[#888a8c] mt-3">
          Discover our handpicked and exceptional properties around the <br />world,
          offering unparalleled luxury
        </p>
      </div>
      <div className="flex items-center mb-5 p-2 gap-5">
        {arr.map((hotelCard, i) => {
          return <HotelSingleCard key={i}/>
        })}
      </div>
      <Button variant={"outline"} className="mt-8">View All Hotels</Button>
    </div>
  );
};

export default HotelCards;
