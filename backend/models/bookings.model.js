import mongoose from "mongoose";

const booking = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // who booked
      ref: "User",
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
    room: {
      type: mongoose.Schema.Types.ObjectId, // which room has been booked
      ref: "Room",
    },
    checkInDate: {
      type: Date,
    },
    checkOutDate: {
      type: Date,
    },
    guest: {
      type: Number,
    },
    totalPrice: {
      type: Number, // totalPrice = nights(new Date(checkOutDate) - new Date(checkInDate)) * pricePerNight
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

export const Booking = new mongoose.model("Booking", booking);
