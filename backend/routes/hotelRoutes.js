import express from "express";
import { addHotel } from "../controllers/hotelControllers.js";

const route = express.Router();

route.post("/addhotel", addHotel);

export default route;
