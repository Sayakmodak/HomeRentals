import React from 'react'
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
import { useListHotelsQuery } from '@/features/api/hotelApi.js';
import { Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ];

const AllHotelsList = () => {
  const navigate = useNavigate();
  const {data, isLoading, isSuccess, isError, error} = useListHotelsQuery();
  // console.log(data?.allHotels);


  if(isLoading){
    return <>Loading...</>
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
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Hotel Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Category
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                City
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Ph No.
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Edit Your Hotel/ Add Room
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {
              allHotels?.map((hotel)=>{
                return (
                  <tr key={hotel?._id}>
                    <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                      {hotel?.hotelName || "The Luxury Hotel"}
                    </td>
                    <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                      {hotel?.hotelCategory || "Luxury"}
                    </td>
                    <td className="py-3 px-5 text-gray-700 border-t border-gray-300 relative left-6">
                      {hotel?.address || "Goa"}
                    </td>
                    <td className="py-3 px-4 text-gray-700 text-sm text-center border-t border-gray-300">
                      {hotel?.contact || "1234567890"}
                    </td>
                    <td className="py-3 px-20 text-gray-700 text-sm text-center border-t border-gray-300 flex justify-center gap-2">
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
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllHotelsList
