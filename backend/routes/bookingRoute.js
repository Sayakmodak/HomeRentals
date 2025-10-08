import express from "express";
import { booking, isAvailable } from "../controllers/bookingController.js";

const route = express.Router();

route.post("/room/booking/hotel/:hotelId/room/:roomId/reserve", booking); // api/v1/hotel/room/booking
route.post(
  "/room/booking/hotel/:hotelId/room/:roomId/isavailable",
  isAvailable
);
export default route;
