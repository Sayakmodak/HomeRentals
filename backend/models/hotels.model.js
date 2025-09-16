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
      enum: [
        "Luxury Stays",
        "Budget Hotels",
        "Boutique Hotels",
        "Business Hotels",
        "Family-Friendly Hotels",
        "Pet-Friendly Hotels",
      ],
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
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
    },
    hotelImages: {
      type: [String],
      // required: true,
    },
    hotelAmenities: [{ type: String }], // array of objects
    rating: {
      type: String,
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  { timestamps: true }
);

export const Hotels = new mongoose.model("Hotel", hotels);
