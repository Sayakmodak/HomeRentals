import mongoose from "mongoose";

const room = new mongoose.Schema({
  roomCategory: {
    type: String,
    enum: ["Single Bed", "Double Bed", "Family Suite", "Luxury Room"],
    required: true,
  },
});

export const Room = new mongoose.model("Room", room);
