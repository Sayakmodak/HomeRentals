import React, { useEffect, useRef, useState } from "react";
import homeJpg from "../assets/home.jpeg";
import { Loader2, XIcon } from "lucide-react";
import { useAddHotelMutation } from "@/features/api/hotelApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterHotelModal = ({ onClose }) => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const [registerHotel, setRegisterHotel] = useState({
    hotelName: "",
    contact: "",
    address: "",
    hotelCategory: ''
  });
  const [addHotel, {data, isLoading, isSuccess, isError, error}] = useAddHotelMutation();

  const hotelCategories = [
    "Luxury Stays",
    "Budget Hotels",
    "Boutique Hotels",
    "Business Hotels",
    "Family-Friendly Hotels",
    "Pet-Friendly Hotels",
  ];

  const handleOnChange = (e)=>{
    const {name, value} = e.target;
    setRegisterHotel((prev)=> ({...prev, [name]: value}));
    // console.log(name, value);
  }
  
  const handleRegisterOnClick = async (e) =>{
    e.preventDefault();
    await addHotel(registerHotel);
    // console.log(registerHotel);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(()=>{
    if(data && isSuccess){
      toast.success(data.message || "Hotel has been registered");
      navigate("/");
      onClose();
    }
    if(error){
      toast.error(error.message || "Some error occured");
    }
  }, [data, isSuccess, error]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70">
      <form
        action=""
        className="flex bg-white rounded-xl max-w-4xl max-md:mx-2 animate-out transition-all translate-0.5"
        ref={modalRef}
      >
        <img
          src={homeJpg}
          alt=""
          className="w-1/2 rounded-xl hidden md:block"
        />

        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <XIcon
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
            onClick={onClose}
          />
          <p className="text-2xl font-semibold">Register</p>

          {/* Hotel name */}
          <div className="w-full mt-4">
            <label htmlFor="hotelName" className="font-medium text-gray-500">
              Hotel Name
            </label>
            <input
              type="text"
              id="hotelName"
              placeholder="Enter hotel name"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
              name="hotelName"
              value={registerHotel.hotelName}
              onChange={handleOnChange}
            />
          </div>
          {/* Contact */}
          <div className="w-full mt-4">
            <label htmlFor="contact" className="font-medium text-gray-500">
              Phone
            </label>
            <input
              type="text"
              id="contact"
              placeholder="Enter hotel name"
              className="border border-gray-200 rounded px-3 py-2.5 mt-1 outline-indigo-500 font-light w-full"
              required
              name="contact"
              value={registerHotel.contact}
              onChange={handleOnChange}
            />
          </div>
          {/* Address */}
          <div className="w-full mt-4">
            <label htmlFor="address" className="font-medium text-gray-500">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter hotel name"
              className="border border-gray-200 rounded px-3 py-2.5 mt-1 outline-indigo-500 font-light w-full"
              required
              name="address"
              value={registerHotel.address}
              onChange={handleOnChange}
            />
          </div>
          {/* Category */}
          <div className="w-full mt-4 max-w-60 mr-auto">
            <label htmlFor="category" className="font-medium text-gray-500">
              Hotel Category
            </label>
            <select
              id="category"
              required
              className="border border-gray-200 rounded px-3 py-2.5 mt-1 outline-indigo-500 font-light w-full"
              name="hotelCategory"
              value={registerHotel.hotelCategory}
              onChange={handleOnChange}
            >
              <option value="">Select Category</option>
              {hotelCategories.map((category, index) => (
                <option value={category} key={index}>{category}</option>
              ))}
            </select>
          </div>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6"
            onClick={handleRegisterOnClick}
          >
            {isLoading ? <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin"/> Please Wait
            </> : "Register" }
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterHotelModal;
