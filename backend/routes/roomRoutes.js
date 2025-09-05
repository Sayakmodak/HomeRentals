import express from "express";
import { addRoom } from "../controllers/roomController.js";
import upload from "../Utils/multer.js";
import { isAuthenticated } from "./../middleware/isAuthenticated.js";

const route = express.Router();

route.post("/addroom", isAuthenticated, upload.array("roomImages", 4), addRoom); // /api/v1/room/addroom

export default route;
