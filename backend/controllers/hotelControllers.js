import { Hotels } from "./../models/hotels.model.js";
// import { User } from "./../models/user.model.js";

export const addHotel = async (req, res) => {
  try {
    const { hotelName, hotelCategory } = req.body;

    if (!hotelName && !hotelCategory) {
      return res.status(400).json({
        success: false,
        message: "All feilds are required",
      });
    }

    const hotel = await Hotels.create({
      hotelName: hotelName,
      hotelCategory: hotelCategory,
    });

    return res.status(200).json({
      success: true,
      message: "New Hotel Created",
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
