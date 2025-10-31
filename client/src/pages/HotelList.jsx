import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CarFrontIcon,
  DogIcon,
  Hotel,
  MapPin,
  Rows4,
  StarIcon,
  Users2,
  Wifi,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useListHotelsQuery,
  useSearchHotelsQuery,
} from "@/features/api/hotelApi";

const categories = [
  { id: "Luxury Stays", label: "Luxury Stays" },
  { id: "Budget Hotels", label: "Budget Hotels" },
  { id: "Boutique Hotels", label: "Boutique Hotels" },
  { id: "Business Hotels", label: "Business Hotels" },
  { id: "Family-Friendly Hotels", label: "Family-Friendly Hotels" },
  { id: "Pet-Friendly Hotels", label: "Pet-Friendly Hotels" },
];

const amenityIcons = {
  "Self parking included": <CarFrontIcon size={16} />,
  "Pets Allowed": <DogIcon size={16} />,
  Restaurant: <Hotel size={16} />,
  "Family Friendly": <Users2 size={16} />,
  "Extra Services": <Rows4 size={16} />,
};

// all hotels will be listed here

const HotelList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError, error } = useListHotelsQuery();
  // console.log(data?.allHotels);

  const [selectedCategories, setSelectedCategories] = useState([]);
  // console.log(selectedCategories); ["Luxury Stays"," Budget Hotels"]

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories((prev) => {
        return [...prev, category];
      });
    } else {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
    }
  };
  const { data: searchData, isLoading: searchIsLoading } =
    useSearchHotelsQuery(selectedCategories);

  if (isLoading) {
    return (
      <>
        <p className="mt-25">Loading...</p>
      </>
    );
  }

  if(searchIsLoading){
    console.log("Loading...");
  }

  const hotels = data?.allHotels;

  // console.log(searchData?.searchHotelByCategory);

  const searchHotelsByCategory = searchData?.searchHotelByCategory; // []


  return (
    <div className="flex flex-col-reverse lg:flex-row items-baseline justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfire text-4xl md:text-[40px]">
            Browse All Hotels
          </h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>

        {searchHotelsByCategory?.length > 0 ? (
          <>
            {searchHotelsByCategory.map((hotelsByCategory) => {
              return (
                <div
                  key={hotelsByCategory._id}
                  className="flex flex-col md:flex-row items-start gap-6 rounded-2xl border-gray-300 my-5 overflow-hidden w-[900px] border"
                >
                  <img
                    src={hotelsByCategory?.hotelImages[0]}
                    alt="hotel-img"
                    title="View room details"
                    className="md:w-1/2 shadow-lg object-cover cursor-pointer"
                    onClick={() => {
                      navigate(`/hotel/${hotelsByCategory._id}`);
                      scrollTo(0, 0);
                    }}
                  />
                  <div className="md:1/2 flex flex-col gap-2 py-2 border-red-500">
                    <p
                      className="text-gray-800 text-3xl cursor-pointer"
                      onClick={() => {
                        navigate(`/hotel/${hotelsByCategory._id}`);
                        scrollTo(0, 0);
                      }}
                    >
                      {hotelsByCategory?.hotelName || "Hotel name"}
                    </p>

                    {/* Hotel Subtitle */}
                    <p>{hotelsByCategory?.hotelSubtitle}</p>

                    <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                      <MapPin size={15} />
                      <span>
                        {" "}
                        {hotelsByCategory?.address || "Hotel Address"}
                      </span>
                    </div>

                    {/* Room amenities */}
                    {hotelsByCategory?.hotelAmenities.map((elm, index) => {
                      return (
                        <span
                          key={index}
                          className="flex items-center gap-2 px-3 rounded-lg border border-gray-300 bg-[#f5f5f5]/70"
                        >
                          <p
                            className="text-[16px] flex items-center gap-1 p-[2px]"
                            key={index}
                          >
                            {amenityIcons[elm]}
                            {elm}
                          </p>
                        </span>
                      );
                    })}

                    <div className="mt-5 flex items-center gap-1 text-gray-500 text-sm">
                      <StarIcon size={15} />
                      <span className="">200+ reviews</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {hotels.map((room, id) => {
              return (
                <div
                  key={id}
                  className="flex flex-col md:flex-row items-start gap-6 rounded-2xl border-gray-300 my-5 overflow-hidden w-[900px] border"
                >
                  <img
                    src={room?.hotelImages[0]}
                    alt="hotel-img"
                    title="View room details"
                    className="md:w-1/2 shadow-lg object-cover cursor-pointer"
                    onClick={() => {
                      navigate(`/hotel/${room._id}`);
                      scrollTo(0, 0);
                    }}
                  />
                  <div className="md:1/2 flex flex-col gap-2 py-2 border-red-500">
                    <p
                      className="text-gray-800 text-3xl cursor-pointer"
                      onClick={() => {
                        navigate(`/hotel/${room._id}`);
                        scrollTo(0, 0);
                      }}
                    >
                      {room?.hotelName || "Hotel name"}
                    </p>

                    {/* Hotel Subtitle */}
                    <p>{room?.hotelSubtitle}</p>

                    <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                      <MapPin size={15} />
                      <span> {room?.address || "Hotel Address"}</span>
                    </div>

                    {/* Room amenities */}
                    {room?.hotelAmenities.map((elm, index) => {
                      return (
                        <span
                          key={index}
                          className="flex items-center gap-2 px-3 rounded-lg border border-gray-300 bg-[#f5f5f5]/70"
                        >
                          <p
                            className="text-[16px] flex items-center gap-1 p-[2px]"
                            key={index}
                          >
                            {amenityIcons[elm]}
                            {elm}
                          </p>
                        </span>
                      );
                    })}

                    <div className="mt-5 flex items-center gap-1 text-gray-500 text-sm">
                      <StarIcon size={15} />
                      <span className="">200+ reviews</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
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
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category.id, checked)
                }
              />

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
