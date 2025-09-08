import mongoose from "mongoose";

const room = new mongoose.Schema(
  {
    // roomRef: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Hotels",
    // },
    roomName: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

export const Room = new mongoose.model("Room", room);
