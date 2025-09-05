import DragandDropContainer from "@/comp/DragandDropContainer";
import { useAddRoomMutation } from "@/features/api/roomApi.js";
import React, { useState } from "react";

const AddRoom = () => {
  const [previewImages, setPreviewImages] = useState([]); // for image preview
  // console.log(previewImages);    array of objects for this line -> return [...prev, { fileImage: fileReader.result }];

  const [addRoomData, setAddRoomData] = useState({
    roomCategory: "",
    pricePerNight: "",
    amenities: [],
  });

  const [roomImages, setRoomImages] = useState([]);

  const [addRoom, { data, isLoading, isSuccess, isError, error }] =
    useAddRoomMutation();

  const amenities = [
    "Free Wifi",
    "Free Breakfast",
    "Free Room Service",
    "Pool Access",
    "Mountain View",
  ];

  const handleOnChange = (e) => {
    const { name, type, checked, value } = e.target;
    //console.log(name, type, checked, value); // category select-one undefined Single Bed, price text false 5, checkbox checkbox true Free Wifi

    if (type === "checkbox") {
      setAddRoomData((prev) => {
        // add checked elements into the amenities array
        if (checked) {
          return { ...prev, amenities: [...prev.amenities, value] };
        }
        // remove unchecked elements from the amenities array
        else {
          return {
            ...prev,
            amenities: [...prev.amenities.filter((elm) => elm !== value)],
          };
        }
      });
    } else {
      setAddRoomData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOnClick = async () => {
    // console.log(addRoomData);
    const formData = new FormData();
    formData.append("roomCategory", addRoomData.roomCategory);
    formData.append("pricePerNight", addRoomData.pricePerNight);

    // append amenites one by one
    addRoomData.amenities.forEach((elm) => {
      formData.append("amenities", elm);
    });

    roomImages.forEach((elm) => {
      formData.append("roomImages", elm);
    });

    await addRoom(formData);
    console.log(data);
    console.log(isSuccess);
  };

  return (
    <div className="ml-5">
      <form action="" encType="multipart/form-data">
        <h1 className="font-semibold text-2xl mb-2">Add Room</h1>
        <p className="mb-2">
          Fill the details accurately and enhance the user experience.
        </p>

        <p className="mb-2 text-gray-500">Upload room imgaes upto 4</p>
        <DragandDropContainer
          setPreviewImages={setPreviewImages}
          setRoomImages={setRoomImages}
        />
      </form>
      {previewImages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 border-red-500 bg-gray-100 mt-5">
          {previewImages?.map((elm, index) => {
            return (
              <div
                key={index}
                className="bg-gray-50 border border-gray-300 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 rounded-sm"
              >
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
            id=""
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
            name="roomCategory"
            onChange={handleOnChange}
            value={addRoomData.roomCategory}
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
            type="text"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            name="pricePerNight"
            value={addRoomData.pricePerNight}
            onChange={handleOnChange}
          />
        </div>
      </div>

      {/* Amenities */}
      <p className="text-gray-800 mt-4">Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
        {amenities.map((elm, index) => {
          return (
            <div key={index} className="flex gap-1">
              <input
                type="checkbox"
                id={elm}
                name="checkbox"
                onChange={handleOnChange}
                value={elm}
              />
              <label htmlFor={elm}>{elm}</label>
            </div>
          );
        })}
      </div>
      <button
        className="bg-blue-600 text-white px-8 py-2 rounded mt-8 cursor-pointer"
        onClick={handleOnClick}
      >
        Add Room
      </button>
    </div>
  );
};

export default AddRoom;
