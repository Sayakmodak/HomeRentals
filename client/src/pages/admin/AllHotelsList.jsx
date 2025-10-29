import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useListHotelsQuery, useSetAsFeaturedMutation, useSetAsUnFeaturedMutation } from "@/features/api/hotelApi.js";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";

const AllHotelsList = () => {
  // main is to do this
  /*{
  "hotel1": true,
  "hotel2": true,
  "hotel3": true
  }*/

  const navigate = useNavigate();
  const [featuredState, setFeaturedState] = useState({});

  const { data, isLoading, isSuccess, isError, error } = useListHotelsQuery();
  // console.log(data?.allHotels);
  const [setAsFeatured, {data: setAsFeaturedData, isLoading: setAsFeaturedIsLoading, isSuccess: setAsFeaturedIsSuccess, isError: setAsFeaturedIsError, error: setAsFeaturedError}] = useSetAsFeaturedMutation();
  
  const [
    setAsUnFeatured,
    {
      data: setAsUnFeaturedData,
      isLoading: setAsUnFeaturedIsLoading,
      isSuccess: setAsUnFeaturedIsSuccess,
      isError: setAsUnFeaturedIsError,
      error: setAsUnFeaturedError,
    },
  ] = useSetAsUnFeaturedMutation();


  const maxCountFeature = 4;
  const handleToggle = (hotelId, value) => {
    const newState = {...featuredState, [hotelId]: value};

    // count
    const onCount = Object.values(newState).filter(Boolean).length;
    if (onCount > maxCountFeature) {
      toast.error("You can feature only up to 4 hotels!");
      return;
    }

    console.log(
      `Hotel ${hotelId} is now ${value ? "Featured" : "Not Featured"}`
    );

    // otherwise
    setFeaturedState({...featuredState, [hotelId]: value});


    if(value){
      setAsFeatured(hotelId);
    }
    else{
      setAsUnFeatured(hotelId);
    }
  };

  const featuredCount = Object.values(featuredState).filter(Boolean).length;

  useEffect(() => {
    if (data?.allHotels) {
      const initialState = {};
      data?.allHotels.forEach((elm) => {
        initialState[elm._id] = elm.isFeatured; // sync backend value
      });
      setFeaturedState(initialState);
    }
  }, [data?.allHotels]);

  useEffect(() => {
    if (setAsFeaturedData && setAsFeaturedIsSuccess) {
      toast.success(
        setAsFeaturedData.message || "Hotel has been marked as featured."
      );
    }
    if (setAsFeaturedError) {
      toast.error(
        setAsFeaturedError.data.message || "Can not be set as featured hotel."
      );
    }
  }, [
    setAsFeaturedData,
    setAsFeaturedIsSuccess,
    setAsFeaturedError,
  ]);

  useEffect(() => {
    if (setAsUnFeaturedData && setAsUnFeaturedIsSuccess) {
      toast.success(
        setAsUnFeaturedData.message ||
          "Hotel has been removed from featured hotels."
      );
    }
    if (setAsUnFeaturedError) {
      toast.error(
        setAsUnFeaturedError.data.message ||
          "Can not able to remove from featured hotels."
      );
    }
  }, [
    setAsUnFeaturedData,
    setAsUnFeaturedIsSuccess,
    setAsUnFeaturedError,
  ]);

  if (isLoading) {
    return <>Loading...</>;
  }

  const allHotels = data?.allHotels;
  // console.log(allHotels);

  return (
    <div className="ml-5 w-full">
      <h1 className="font-semibold text-2xl mb-2">All Hotels</h1>
      <p className="mb-2">
        View your all listed hotels. From here you can manage your hotels.
      </p>

      <div className="w-full max-w-5xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table className="w-full border-red-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Hotel Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Category
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                City
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Ph No.
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center border-red-500">
                Mark as Feature
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center border-red-500">
                Edit Your Hotel/ Add Room
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">

            {allHotels?.map((hotel) => {
              const isChecked = featuredState[hotel?._id];
              const disableSwitch =
                !isChecked && featuredCount >= maxCountFeature; // disable unselected ones if already 4 selected

              return (
                <tr key={hotel?._id}>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {hotel?.hotelName || "The Luxury Hotel"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                    {hotel?.hotelCategory || "Luxury"}
                  </td>
                  <td className="py-3 px-5 text-gray-700 border-t border-gray-300 relative left-1">
                    {hotel?.address || "Goa"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm text-center border-t border-gray-300">
                    {hotel?.contact || "1234567890"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm text-center border-t border-gray-300">
                    <Switch
                      checked={isChecked}
                      disabled={disableSwitch}
                      onCheckedChange={(value) => {
                        handleToggle(hotel?._id, value);
                      }}
                    />
                  </td>
                  <td className="py-3 px-10 text-gray-700 text-sm text-center border-t border-gray-300 flex justify-center gap-2">
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        navigate(`/owner/edit-hotel/${hotel._id}/addroom`);
                      }}
                      className="cursor-pointer"
                    >
                      <Edit size={20} /> Add Room
                    </Button>
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        navigate(`/owner/edit-hotel/${hotel._id}/update-hotel`);
                      }}
                      className="cursor-pointer"
                    >
                      <Edit size={20} /> Update Hotel
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllHotelsList;
