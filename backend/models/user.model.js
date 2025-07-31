import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    role:{
        type: String,
        enum: ["customer", "seller"],
        default: "customer"
    },
    wishList: [
      {
        type: String,
      }
    ],
    purchasedHotels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotels"
        }
    ],
  },
  { timestamps: true }
);


export const User = mongoose.model("User", userSchema);