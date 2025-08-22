import mongoose from "mongoose";

const room = new mongoose.Schema({
  roomCategory: {
    type: String,
    enum: ["single bed", "double bed", "family suite", "luxury room"],
    required: true,
  },
});

export const Room = new mongoose.model("Room", room);
