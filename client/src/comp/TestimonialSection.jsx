import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";
import TestimonialCard from "./TestimonialCard";
// import home from "src/assets/"

const TestimonialSection = () => {
  return (
    <div className="pt-20 flex items-center flex-col pb-10 border-red-500">
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold text-[#252525]">
          What Our Guests Say
        </h1>
        <p className="text-[#888a8c] mt-3">
          Discover why travelers choose HomeRentals around the world for their
          luxury accommodations
        </p>
      </div>

      <div className="flex justify-center gap-5">
        {Array.from({ length: 3 }).map((elm, i) => (
          <TestimonialCard key={i} />
        ))}
      </div>

    </div>
  );
};

export default TestimonialSection;