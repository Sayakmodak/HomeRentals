import mongoose from "mongoose";

const hotels = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      required: true,
    },
    hotelSubtitle: {
      type: String,
    },
    hotelCategory: {
      type: String,
      enum: ["single bed", "double bed", "family suite", "luxury room"],
      required: true,
    },
    hotelDesc: {
      type: String,
    },
    price: {
      type: Number,
      // required: true,
    },
    contact: {
      type: String,
      // required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      // required: true,
    },
    isPublished: {
      type: Boolean,
    },
    hotelImages: {
      type: Array,
      // required: true,
    },
    rating: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Hotels = new mongoose.model("Hotel", hotels);
