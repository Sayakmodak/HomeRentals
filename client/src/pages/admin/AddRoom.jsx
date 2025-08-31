import DragandDropContainer from "@/comp/DragandDropContainer";
import { Upload } from "lucide-react";
import React, { useState } from "react";

const AddRoom = () => {
  const [previewImages, setPreviewImages] = useState([]);
  // console.log(previewImages);

  const amenities = [
    "Free Wifi", "Free Breakfast", "Free Room Service", "Pool Access", "Mountain View"
  ];

  return (
    <div className="ml-5">
      <form action="" encType="multipart/form-data">
        <h1 className="font-semibold text-2xl mb-2">Add Room</h1>
        <p className="mb-2">
          Fill the details accurately and enhance the user experience.
        </p>

        <p className="mb-2 text-gray-500">Upload room imgaes upto 4</p>
        <DragandDropContainer setPreviewImages={setPreviewImages} />
      </form>
      {previewImages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 border-red-500 bg-gray-100 mt-5">
          {previewImages?.map((elm) => {
            return (
              <div className="bg-gray-50 border border-gray-300 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 rounded-sm">
                <img src={elm.fileImage} alt="" />
              </div>
            );
          })}
        </div>
      )}
      {/* Room type */}
      <div className="w-full flex max:sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Room Type</p>
          <select
            name=""
            id=""
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Family Suite">Family Suite</option>
            <option value="Luxury Room">Luxury Room</option>
          </select>
        </div>

        {/* Price per night */}
        <div>
          <p className="mt-4 text-gray-500">
            Price <span className="text-xs">/night</span>
          </p>
          <input
            type="number"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
          />
        </div>
      </div>

      {/* Amenities */}
      <p className="text-gray-800 mt-4">Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
        {amenities.map((elm, index) => {
          return (
            <div key={index} className="flex gap-1">
              <input type="checkbox" id={elm} />
              <label htmlFor={elm}>{elm}</label>
            </div>
          );
        })}
      </div>
      <button className="bg-blue-600 text-white px-8 py-2 rounded mt-8 cursor-pointer">
        Add Room
      </button>
    </div>
  );
};

export default AddRoom;
