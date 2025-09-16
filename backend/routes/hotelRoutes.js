import express from "express";
import {
  addHotel,
  getHotelById,
  listHotels,
  updateHotel,
} from "../controllers/hotelControllers.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import upload from "./../Utils/multer.js";

const route = express.Router();

route.post("/addhotel", isAuthenticated, addHotel);
route.get("/list-hotels", isAuthenticated, listHotels);
route.get("/hotel/:hotelId", isAuthenticated, getHotelById);
route.put(
  "/update-hotel/:hotelId",
  upload.array("hotelImages", 4),
  isAuthenticated,
  updateHotel
);
export default route;
