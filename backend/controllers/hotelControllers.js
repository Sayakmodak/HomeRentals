import { User } from "../models/user.model.js";
import { uploadMedia } from "../Utils/cloudinary.js";
import { Hotels } from "./../models/hotels.model.js";

export const addHotel = async (req, res) => {
  try {
    const { hotelName, hotelCategory, contact, address } = req.body;
    const userId = req.id;
    // console.log(userId);

    const owner = await User.findOne({ _id: userId }).select("-password");
    // console.log(hotelName, hotelCategory, contact, address);

    if (!hotelName && !hotelCategory && !contact && !address) {
      return res.status(400).json({
        success: false,
        message: "All feilds are required",
      });
    }

    const hotel = await Hotels.create({
      hotelName: hotelName,
      hotelCategory: hotelCategory,
      contact: contact,
      address: address,
      owner: owner._id,
    });

    return res.status(200).json({
      success: true,
      message: "Your Hotel Is Registered",
      hotel: hotel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Can not create new hotel",
    });
  }
};

export const listHotels = async (req, res) => {
  try {
    const allHotels = await Hotels.find().populate({ path: "rooms" });
    if (!allHotels) {
      return res.status(500).json({
        success: false,
        message: "Can not list all hotels",
      });
    }

    return res.status(200).json({
      success: true,
      message: "View all the hotels that you created",
      allHotels,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Can not list all hotels, some error occured",
    });
  }
};

export const getHotelById = async (req, res) => {
  try {
    const { hotelId } = req.params;
    console.log(hotelId);

    const hotel = await Hotels.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Could not find the hotel",
      });
    }
    return res.status(200).json({
      success: true,
      hotel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Can not get hotel, some error occured",
    });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { hotelName, hotelSubtitle, hotelCategory, amenities } = req.body;
    // console.log(hotelName, hotelSubtitle, hotelCategory, amenities);

    const files = req.files; // files from the Edit Hotel page image

    const hotel = await Hotels.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Could not find the hotel",
      });
    }

    const hotelImages = [];

    for (let img of files) {
      const hotelImage = await uploadMedia(img.path);
      hotelImages.push(hotelImage.secure_url);
    }

    const updatedHotelInfo = {
      hotelName: hotelName,
      hotelSubtitle: hotelSubtitle,
      hotelCategory: hotelCategory,
      hotelAmenities: amenities,
      hotelImages: hotelImages,
    };

    const updatedHotel = await Hotels.findByIdAndUpdate(
      hotelId,
      updatedHotelInfo,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Your Hotel has been updated",
      updatedHotel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Can not update the hotel, some error occured while updating",
    });
  }
};
