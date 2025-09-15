import DragandDropContainer from "@/comp/DragandDropContainer";
import {
  useAddRoomMutation,
  useFetchSpecificRoomQuery,
  useUpdateRoomMutation,
} from "@/features/api/roomApi.js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";

const AddRoom = () => {
  const location = useLocation();
  // console.log(location.pathname);
  // console.log(location.pathname.includes("update-room"));

  const params = useParams();
  const { hotelId, roomId } = params;
  // console.log(roomId); // 68bf2b72cce908ea7bfb52d2
  // console.log("Hotel Id of Hotel Sea gull is", hotelId);  // 68b5a8d408f558795280138f

  const [previewImages, setPreviewImages] = useState([]); // for image preview
  // console.log(previewImages);    array of objects for this line -> return [...prev, { fileImage: fileReader.result }];

  const [addRoomData, setAddRoomData] = useState({
    roomName: "",
    roomCategory: "",
    pricePerNight: "",
    amenities: [],
  });
  const [roomImages, setRoomImages] = useState([]);

  const [
    addRoom,
    {
      data: addRoomDataInfo,
      isLoading: addRoomIsLoading,
      isSuccess: addRoomIsSuccess,
      isError: addRoomIsError,
      error: addRoomError,
    },
  ] = useAddRoomMutation();

  const {
    data: specificRoomData,
    isLoading: specificRoomIsLoading,
    isSuccess: specificRoomIsSuccess,
    isError: specificRoomIsError,
    error: specificRoomError,
  } = useFetchSpecificRoomQuery(roomId);

  const [
    updateRoom,
    {
      data: updateRoomData,
      isLoading: updateRoomIsLoading,
      isSuccess: updateRoomIsSuccess,
      isError: updateRoomIsError,
      error: updateRoomError,
    },
  ] = useUpdateRoomMutation();

  // console.log("data is", specificRoomData?.room);

  const room = specificRoomData?.room;
  // console.log(room.roomName);

  const amenities = [
    "Free Wifi",
    "Free Breakfast",
    "Free Room Service",
    "Pool Access",
    "Mountain View",
  ];

  useEffect(()=>{
    if(specificRoomIsSuccess || room){
      setAddRoomData((prev)=> {
        return {
          ...prev,
          roomName: room.roomName,
          pricePerNight: room.pricePerNight,
          roomCategory: room.roomCategory,
          amenities: [...prev.amenities, ...room.amenities],
        };
      })
    }
  }, [room]);

  const handleOnChange = (e) => {
    const { name, type, checked, value } = e.target;
    //console.log(name, type, checked, value); // price text false 5, checkbox checkbox true Free Wifi

    if (type === "checkbox") {
      setAddRoomData((prev) => {
        // add checked elements into the amenities array
        if (checked) {
          return { ...prev, amenities: [...prev.amenities, value] }; // takes the old amenities array and adds the new checked value at the end.
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
    formData.append("roomName", addRoomData.roomName);
    formData.append("roomCategory", addRoomData.roomCategory);
    formData.append("pricePerNight", addRoomData.pricePerNight);

    // append amenites one by one
    addRoomData.amenities.forEach((elm) => {
      formData.append("amenities", elm);
    });

    roomImages.forEach((elm) => {
      formData.append("roomImages", elm);
    });
    await addRoom({ hotelId, formData });
  };


  const handleUpdateRoom = async ()=>{
    // console.log(addRoomData);

    const formData = new FormData();
    formData.append("roomName", addRoomData.roomName);
    formData.append("roomCategory", addRoomData.roomCategory);
    formData.append("pricePerNight", addRoomData.pricePerNight);
    addRoomData.amenities.forEach((elm)=>{
      formData.append("amenities", elm);
    })

    roomImages.forEach((img)=>{
      formData.append("roomImage", img);
    })
    await updateRoom({roomId, formData});
  }


  useEffect(() => {
    if (addRoomDataInfo?.message || addRoomIsSuccess) {
      toast.success(
        addRoomDataInfo?.message || "Room has been created successfully"
      );
    }
    if (addRoomIsError) {
      toast.error(addRoomIsError.message || "Can not create a room");
    }
  }, [addRoomIsSuccess, addRoomIsError]);

  useEffect(()=>{
    if(updateRoomIsSuccess || updateRoomData?.message){
      toast.success(updateRoomData?.message || "Your room has been updated")
    }
    if(updateRoomError){
      toast.error(updateRoomError.message || "Some error occured while updating the room");
    }
  }, [updateRoomIsSuccess, updateRoomIsError]);

  if (specificRoomIsLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="ml-5">
      <form action="" encType="multipart/form-data">
        <h1 className="font-semibold text-2xl mb-2">Add Room</h1>
        <p className="mb-2">
          Fill the details accurately and enhance the user experience.
        </p>

        <p className="mb-2 text-gray-500">Upload room images upto 4</p>
        <DragandDropContainer
          setPreviewImages={setPreviewImages}
          setRoomImages={setRoomImages}
          type="room"
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
      {/* Room Name */}
      <div>
        <p className="mt-4 text-gray-500">Room Name</p>
        <input
          type="text"
          placeholder=""
          className="border border-gray-300 mt-1 rounded p-2 w-50"
          name="roomName"
          value={addRoomData.roomName}
          onChange={handleOnChange}
        />
      </div>

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
                checked={addRoomData.amenities.includes(elm)}
                onChange={handleOnChange}
                value={elm}
              />
              <label htmlFor={elm}>{elm}</label>
            </div>
          );
        })}
      </div>
      {location.pathname.includes("update-room") ? (
        <>
          <button
            className="bg-blue-600 text-white px-8 py-2 rounded mt-8 cursor-pointer"
            onClick={handleUpdateRoom}
          >
            {updateRoomIsLoading ? (
              <>
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Please Wait...
                </div>
              </>
            ) : (
              <>Update Room</>
            )}
          </button>
        </>
      ) : (
        <>
          <button
            className="bg-blue-600 text-white px-8 py-2 rounded mt-8 cursor-pointer"
            onClick={handleOnClick}
          >
            {addRoomIsLoading ? (
              <>
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Please Wait...
                </div>
              </>
            ) : (
              <>Add Room</>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default AddRoom;
