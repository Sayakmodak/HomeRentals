import DragandDropContainer from "@/comp/DragandDropContainer";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2, ReceiptTurkishLira } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";

const EditHotel = () => {
  const loading = false;
  const [updateHotelInfo, setUpdateHotelInfo] = useState({
    hotelName: "",
    hotelSubtitle: "",
    hotelCategory: "",
    amenities: [],
  });

  const [previewHotelImages, setPreviewHotelImages] = useState([]);
  const [hotelImages, setHotelImages] = useState([]);

  const hotelCategories = [
    "Luxury Stays",
    "Budget Hotels",
    "Boutique Hotels",
    "Business Hotels",
    "Family-Friendly Hotels",
    "Pet-Friendly Hotels",
  ];

  const amenities = [
    "Self parking included",
    "Pets Allowed",
    "Restaurant",
    "Family Friendly",
    "Extra Services",
  ];

  const handleUpdateHotel = (e) =>{
    const {name, type, checked, value} = e.target;
    // console.log(name, type, checked, value);

    if(type === "checkbox"){
      // add to the amenities array
      if(checked){
        setUpdateHotelInfo((prev)=>{
          return {...prev, amenities: [...prev.amenities, value]};
        })
      }
      // remove from the amenities array
      else{
        setUpdateHotelInfo((prev)=>{
          return {...prev, amenities: [...prev.amenities.filter((elm)=> elm !== value)]};
        })
      }
    }else{
      setUpdateHotelInfo((prev)=>{
        return {...prev, [name]: value};
      })
    }
  }

  const updateHotelOnClick = () =>{
    console.log(updateHotelInfo);
  }

  return (
    <div className="ml-5">
      <form action="" encType="multipart/form-data">
        <h1 className="font-semibold text-2xl mb-2">Update Your Hotel</h1>
        <p className="mb-2">
          Fill the details accurately and enhance the user experience.
        </p>

        <p className="mb-2 text-gray-500">Upload room images upto 4</p>
        <DragandDropContainer
          type="hotel"
          setPreviewHotelImages={setPreviewHotelImages}
          // setHotelImages={setHotelImages}
        />
      </form>
      {previewHotelImages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 border-red-500 bg-gray-100 mt-5">
          {previewHotelImages?.map((elm, index) => {
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

      {/* Hotel Name */}
      <div>
        <p className="mt-4 text-gray-500">Hotel Name</p>
        <input
          type="text"
          placeholder="hotel name..."
          className="border border-gray-300 mt-1 rounded p-2 w-50"
          name="hotelName"
          value={updateHotelInfo.hotelName}
          onChange={handleUpdateHotel}
        />
      </div>

      {/* Hotel Subtitlle */}
      <div>
        <p className="mt-4 text-gray-500">Hotel Subtitle</p>
        <input
          type="text"
          placeholder="hotel subtitle..."
          className="border border-gray-300 mt-1 rounded p-2 w-70"
          name="hotelSubtitle"
          value={updateHotelInfo.hotelSubtitle}
          onChange={handleUpdateHotel}
        />
      </div>

      {/* Hotel type */}
      <div className="w-full flex max:sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Hotel Type</p>
          <select
            id=""
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
            name="hotelCategory"
            onChange={handleUpdateHotel}
            value={updateHotelInfo.hotelCategory}
          >
            <option value="">Select Hotel Type</option>
            {hotelCategories.map((elm, index) => {
              return (
                <option value={elm} key={index}>
                  {elm}
                </option>
              );
            })}
          </select>
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
                // checked={addRoomData.amenities.includes(elm)}
                onChange={handleUpdateHotel}
                value={elm}
              />
              <label htmlFor={elm}>{elm}</label>
            </div>
          );
        })}
      </div>

      <>
        <button
          className="bg-blue-600 text-white px-8 py-2 rounded mt-8 cursor-pointer"
          onClick={updateHotelOnClick}
        >
          {loading ? (
            <>
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Please Wait...
              </div>
            </>
          ) : (
            <>Update Hotel</>
          )}
        </button>
      </>
    </div>
  );
};

export default EditHotel;
