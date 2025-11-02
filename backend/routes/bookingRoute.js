import express from "express";
import {
  booking,
  isAvailable,
  showMyBookings,
} from "../controllers/bookingController.js";
import { isAuthenticated } from "./../middleware/isAuthenticated.js";

const route = express.Router();

route.get("/:userId/mybookings", isAuthenticated, showMyBookings);
route.post(
  "/room/booking/hotel/:hotelId/room/:roomId/reserve",
  isAuthenticated,
  booking
);
route.post(
  "/room/booking/hotel/:hotelId/room/:roomId/isavailable",
  isAuthenticated,
  isAvailable
);
export default route;
