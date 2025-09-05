import express from "express";
import { addHotel, listHotels } from "../controllers/hotelControllers.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const route = express.Router();

route.post("/addhotel", isAuthenticated, addHotel);
route.get("/list-hotels", isAuthenticated, listHotels);

export default route;
