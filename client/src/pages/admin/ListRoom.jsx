import { useListHotelsQuery } from "@/features/api/hotelApi";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ListRoom = () => {
  const navigate = useNavigate();
  // calling API
  const { data, isLoading, isSuccess, isError, error } = useListHotelsQuery();
  console.log(data?.allHotels);

  if (isLoading) {
    return <>Loading...</>;
  }

  const hotelList = data.allHotels || [];
  console.log(hotelList.length);

  return (
    <div className="px-6 bg-gray-50 min-h-screen flex flex-col w-full border-orange-700 mb-[-20px]">
      {/* <div className="w-full max-w-md bg-white rounded-xl shadow-md p-4 space-y-6 border border-red-500"> */}
      {hotelList.map((hotel, index) => (
        <div key={index} className="space-y-3">
          {/* Hotel Name */}
          <div className="border border-gray-400 rounded-md px-4 py-2 font-semibold text-gray-700 mt-5">
            <p className="border-green-600">
              {" "}
              {hotel.hotelName || "Hotel Name"}
            </p>
          </div>

          {/* Rooms */}
          {hotel.rooms.length > 0 ? (
            <div className="ml-6 space-y-2 border border-gray-300 rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-gray-800 font-medium">
                      Name
                    </th>
                    <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                      Category
                    </th>
                    <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                      Facility
                    </th>
                    <th className="py-3 px-4 text-gray-800 font-medium text-center">
                      Price /night
                    </th>
                    <th className="py-3 px-4 text-gray-800 font-medium text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {
                    hotel.rooms.map((elm, index)=>{
                      return (
                        <tr key={index}>
                          <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                            <p>{elm.roomName}</p>
                          </td>
                          <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                            <p>{elm.roomCategory || "Single Bed"}</p>
                          </td>
                          <td className="py-3 px-4 text-center text-gray-700 border-t border-gray-300 max-sm:hidden">
                            {elm.amenities.map((item, index)=>{
                              return (
                                <span key={index}>{item + "," + " "}</span>
                              );}
                            )}
                          </td>
                          <td className="py-3 px-8 text-center text-gray-700 border-t border-gray-300">
                            <p key={index}>{elm.pricePerNight || "5999"}</p>
                          </td>
                          <td className="py-3 px-4 text-red-500 text-sm text-center border-t border-gray-300">
                            <label
                              htmlFor=""
                              className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3"
                            >
                              <Edit
                                key={index}
                                size={20}
                                onClick={() => {
                                  navigate(
                                    `/owner/update-room/hotel/${hotel._id}/room/${elm._id}`
                                  );
                                }}
                                className="cursor-pointer"
                              />
                            </label>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center mt-10">No Room Is Listed</p>
          )}
        </div>
      ))}
      {/* </div> */}
    </div>
  );
};

export default ListRoom;
