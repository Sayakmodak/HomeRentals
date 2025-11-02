import { Booking } from "../models/bookings.model.js";
import { Room } from "./../models/room.models.js";

export const booking = async (req, res) => {
  try {
    const { roomId, hotelId } = req.params;
    const { name, checkInDate, checkOutDate, guest } = req.body;
    // console.log(name, checkInDate, checkOutDate, guest);
    const userId = req.id;

    // find the room
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "could not find the room",
      });
    }

    // check the time of booking should not be overlaps
    const isAvailable = await Booking.findOne({
      room: roomId,
      $and: [
        { checkInDate: { $lt: new Date(checkOutDate) } },
        { checkOutDate: { $gt: new Date(checkInDate) } },
      ],
    });
    // console.log(isAvailable);

    if (isAvailable) {
      return res.status(503).json({
        success: false,
        message: "Room is not available",
      });
    }

    // calculate number of guests
    const roomCapacity = await room.capacity;
    if (+guest > roomCapacity) {
      return res.status(400).json({
        success: false,
        message: "Room capacity exceeds",
      });
    }

    // calculate the total price
    const nights =
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);
    const totalPrice = nights * parseFloat(+room.pricePerNight);
    // console.log(nights, totalPrice);

    const booking = await Booking.create({
      name: name,
      user: userId,
      hotel: hotelId,
      room: roomId,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      guest: guest,
      totalPrice: totalPrice,
    });

    return res.status(200).json({
      success: true,
      message: "Your room has been confirmed",
      booking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

export const isAvailable = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { checkInDate, checkOutDate } = req.body;
    // console.log(checkInDate, checkOutDate);

    const isAvailable = await Booking.findOne({
      room: roomId,
      checkInDate: { $lt: new Date(checkOutDate) },
      checkOutDate: { $gt: new Date(checkInDate) },
    });

    if (isAvailable) {
      return res.status(503).json({
        success: true,
        message: "Room is not available",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Room is available",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// show my bookings
export const showMyBookings = async (req, res) => {
  try {
    const userId = req.id;

    const booking = await Booking.find({ user: userId })
      .populate({
        path: "room",
      })
      .populate({ path: "hotel" });
    // console.log("booking info is ", booking);

    if (!booking) {
      return res.status(404).json({
        success: true,
        message: "Booking data is not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking data is fetched",
      booking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured while showing my bookigs",
    });
  }
};

// TODO
export const showOnlyAvailableRooms = async (req, res) => {
  try {
    const {} = req.body;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured while checking",
    });
  }
};
