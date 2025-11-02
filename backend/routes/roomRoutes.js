import express from "express";
import {
  addRoom,
  fetchSpecificRoom,
  updateRoom,
} from "../controllers/roomController.js";
import upload from "../Utils/multer.js";
import { isAuthenticated } from "./../middleware/isAuthenticated.js";

const route = express.Router();

route.get("/room/:roomId", isAuthenticated, fetchSpecificRoom); // http://localhost:8080/api/v1/hotel/room/68bf2b72cce908ea7bfb52d2

// ${hotelId}/room/addroom
route.post(
  "/:hotelId/room/addroom",
  isAuthenticated,
  upload.array("roomImages", 4),
  addRoom
); // /api/v1/hotel/:hotelId/room/addroom

route.put(
  "/room/:roomId",
  isAuthenticated,
  upload.array("roomImage", 4),
  updateRoom // http://localhost:8080/api/v1/hotel/room/68bf2b72cce908ea7bfb52d2
);

export default route;
