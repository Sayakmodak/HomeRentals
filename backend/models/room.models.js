import mongoose from "mongoose";

const room = new mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
    },
    roomDesc: {
      type: String,
    },
    roomImages: {
      // now, roomImages is an array of strings
      type: [String],
      default: [],
    },
    roomCategory: {
      type: String,
      enum: ["Single Bed", "Double Bed", "Family Suite", "Luxury Room"],
      required: true,
    },
    amenities: [{ type: String }],
    pricePerNight: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number, // guest capacity
    },
  },
  { timestamps: true }
);

export const Room = new mongoose.model("Room", room);
