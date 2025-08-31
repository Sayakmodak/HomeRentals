import express from "express";
import { addHotel, listHotels } from "../controllers/hotelControllers.js";

const route = express.Router();

route.post("/addhotel", addHotel);
route.get("/list-hotels", listHotels);

export default route;
