import DragandDropContainer from "@/comp/DragandDropContainer";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2, Wifi } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  useGetHotelByIdQuery,
  useUpdateHotelMutation,
} from "@/features/api/hotelApi";
import { Editor } from "primereact/editor";
import RichTextEditor from "@/comp/RichTextEditor";

const EditHotel = () => {
  const params = useParams();
  const { hotelId } = params;
  // console.log(hotelId);

  const [updateHotelInfo, setUpdateHotelInfo] = useState({
    hotelName: "",
    hotelSubtitle: "",
    description: "",
    hotelCategory: "",
    amenities: [],
  });   

  const [previewHotelImages, setPreviewHotelImages] = useState([]);
  const [hotelImages, setHotelImages] = useState([]);

  const {
    data: getHotelByIddata,
    isLoading: getHotelByIdIsloading,
    isError: getHotelByIdIserror,
    error: getHotelByIdError,
  } = useGetHotelByIdQuery(hotelId);

  const [updateHotel, { data, isLoading, isSuccess, isError, error }] =
    useUpdateHotelMutation();

  const hotel = getHotelByIddata?.hotel;

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

  useEffect(() => {
    if (getHotelByIddata?.hotel) {
      // when the getHotelByIddata?.hotel is available
      setUpdateHotelInfo((prev) => {
        return {
          ...prev,
          hotelName: hotel.hotelName,
          hotelCategory: hotel.hotelCategory,
        };
      });
    }
  }, [hotel]);


  const handleUpdateHotelOnChange = (e) => {
    const { name, type, checked, value } = e.target;
    // const descValue = e.htmlValue;
    console.log(name, type, checked, value);

    // console.log(descValue);

    if (type === "checkbox") {
      // add to the amenities array
      if (checked) {
        setUpdateHotelInfo((prev) => {
          return { ...prev, amenities: [...prev.amenities, value] };
        });
      }
      // remove from the amenities array
      else {
        setUpdateHotelInfo((prev) => {
          return {
            ...prev,
            amenities: [...prev.amenities.filter((elm) => elm !== value)],
          };
        });
      }
    }
    // else if(name === "description"){
    //   setUpdateHotelInfo((prev)=>{
    //     return {...prev, description: descValue};
    //   })
    // }
     else {
      setUpdateHotelInfo((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };  

  // always check all the data is available or not from the API
  const updateHotelOnClick = async () => {
    // console.log(updateHotelInfo);
    const formData = new FormData();
    formData.append("hotelName", updateHotelInfo?.hotelName);
    formData.append("hotelSubtitle", updateHotelInfo?.hotelSubtitle);
    formData.append("hotelCategory", updateHotelInfo?.hotelCategory);

    updateHotelInfo.amenities.forEach((elm) => {
      formData.append("amenities", elm);
    });

    hotelImages.forEach((elm) => {
      formData.append("hotelImages", elm);
    });

    await updateHotel({ hotelId, formData });
  };

  useEffect(()=>{
    if(isSuccess || data){
      toast.success(data.message || "Your hotel has been updated");
    }
    if(isError){
      toast.error(error.message || "Some error occured");
    }
  }, [data, isSuccess, isError]);

  if (getHotelByIdIsloading) {
    return <>Loading...</>;
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
          setHotelImages={setHotelImages}
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
          onChange={handleUpdateHotelOnChange}
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
          onChange={handleUpdateHotelOnChange}
        />
      </div>

      {/* Hotel Description */}
      <div>
        <p className="mt-4 text-gray-500">Description</p>
        <RichTextEditor updateHotelInfo={updateHotelInfo} setUpdateHotelInfo={setUpdateHotelInfo} name="desc" style={{height: "320px"}}/>
      </div>

      {/* Hotel type */}
      <div className="w-full flex max:sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Hotel Type</p>
          <select
            id=""
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
            name="hotelCategory"
            onChange={handleUpdateHotelOnChange}
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
                onChange={handleUpdateHotelOnChange}
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
          {isLoading ? (
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
