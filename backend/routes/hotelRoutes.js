import express from "express";
import {
  addHotel,
  fetchFeaturedHotels,
  getHotelById,
  listHotels,
  searchHotel,
  setAsFeatured,
  setAsUnFeatured,
  updateHotel,
} from "../controllers/hotelControllers.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import upload from "./../Utils/multer.js";

const route = express.Router();

route.get("/search-by-category", isAuthenticated, searchHotel);
route.post("/addhotel", isAuthenticated, addHotel);
route.get("/list-hotels", isAuthenticated, listHotels);
route.get("/hotel/featuredhotels", isAuthenticated, fetchFeaturedHotels);
route.get("/hotel/:hotelId", isAuthenticated, getHotelById);
route.put(
  "/update-hotel/:hotelId",
  upload.array("hotelImages", 4),
  isAuthenticated,
  updateHotel
);
route.post("/hotel/:hotelId/setasfeature", isAuthenticated, setAsFeatured);
route.post("/hotel/:hotelId/setasunfeature", isAuthenticated, setAsUnFeatured);

export default route;
