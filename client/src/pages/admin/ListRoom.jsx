import { useListHotelsQuery } from '@/features/api/hotelApi'
import React from 'react'

const ListRoom = () => {
  // address: "Goa";
  // contact: "6297572509";
  // createdAt: "2025-08-30T16:36:43.996Z";
  // hotelCategory: "Luxury Stays";
  // hotelImages: [];
  // hotelName: "Hotel Marine Beach";
  // updatedAt: "2025-08-30T16:36:43.996Z";
  // __v: 0;
  // _id: "68b3289bb5798a99611d5459";

  
  // calling API
  const { data, isLoading, isSuccess, isError, error } = useListHotelsQuery();
  console.log(data?.allHotels);

  if(isLoading){
    return <>Loading...</>
  }

  const hotelList = data.allHotels || [];

  return (
    // <div className="ml-5">
    //   <h1 className="font-semibold text-2xl mb-2">List Room</h1>
    //   <p className="mb-2">
    //     View, edit, or manage all listed rooms. Keep the information up-to-date
    //     to provide the best experience for users.
    //   </p>

    //   <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
    //     <table className="w-full">
    //       <thead className="bg-gray-50">
    //         <tr>
    //           <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
    //           <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
    //             Facility
    //           </th>
    //           <th className="py-3 px-4 text-gray-800 font-medium text-center">
    //             Price /night
    //           </th>
    //           <th className="py-3 px-4 text-gray-800 font-medium text-center">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody className='text-sm'>
    //         <tr>
    //           <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>Single Bed</td>
    //           <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>Pool Access, Mountain View, Free Breakfast</td>
    //           <td className='py-3 px-8 text-gray-700 border-t border-gray-300'>499</td>
    //           <td className='py-3 px-4 text-red-500 text-sm text-center border-t border-gray-300'>
    //             <label htmlFor="" className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
    //               <input type="checkbox" className='sr-only peer'/>
    //               <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'>
    //               </div>
    //               <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'>
    //               </span>
    //             </label>
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // </div>

    <div className="px-6 bg-gray-50 min-h-screen flex flex-col w-full border-orange-700 mb-[-20px]">
      {/* <div className="w-full max-w-md bg-white rounded-xl shadow-md p-4 space-y-6 border border-red-500"> */}
      {hotelList.map((hotel, index) => (
        <div key={index} className="space-y-3">
          {/* Hotel Name */}
          <div className="border border-gray-400 rounded-md px-4 py-2 font-semibold text-gray-700 mt-5">
            <p className="border-green-600"> {hotel.hotelName || "Hotel Name"}</p>
          </div>

          {/* Rooms */}
          <div className="ml-6 space-y-2 border border-gray-300 rounded-lg">
            {/* {Array.from({ length: 3 }).map((room, idx) => (
              <div
                key={idx}
                className="border border-gray-300 rounded-md px-3 py-2 text-gray-600"
              >
                Room Name
              </div>
            ))} */}
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
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
                <tr>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                    Single Bed
                  </td>
                  <td className="py-3 px-4 text-center text-gray-700 border-t border-gray-300 max-sm:hidden">
                    Pool Access, Mountain View, Free Breakfast
                  </td>
                  <td className="py-3 px-8 text-center text-gray-700 border-t border-gray-300">
                    499
                  </td>
                  <td className="py-3 px-4 text-red-500 text-sm text-center border-t border-gray-300">
                    <label
                      htmlFor=""
                      className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3"
                    >
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
      {/* </div> */}
    </div>
  );
}

export default ListRoom
