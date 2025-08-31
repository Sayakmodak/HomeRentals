import { Hotels } from "./../models/hotels.model.js";

export const addHotel = async (req, res) => {
  try {
    const { hotelName, hotelCategory, contact, address } = req.body;

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
    const allHotels = await Hotels.find();
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
