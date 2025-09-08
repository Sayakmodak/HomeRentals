import express from "express";
import { addRoom } from "../controllers/roomController.js";
import upload from "../Utils/multer.js";
import { isAuthenticated } from "./../middleware/isAuthenticated.js";

const route = express.Router();

// ${hotelId}/room/addroom
route.post(
  "/:hotelId/room/addroom",
  isAuthenticated,
  upload.array("roomImages", 4),
  addRoom
); // /api/v1/hotel:hotelId/room/addroom

export default route;
