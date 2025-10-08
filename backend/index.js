import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import dbConnection from "./dbConnection/db.js";
import userRoute from "./routes/userRoutes.js";
import hotelRoute from "./routes/hotelRoutes.js";
import roomRoute from "./routes/roomRoutes.js";
import bookingRoute from "./routes/bookingRoute.js";

dotenv.config({});

const port = process.env.PORT || 8000;

const app = express();

// default middlewares
app.use(express.json());
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// load the cookie-parsing middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

dbConnection();

app.get("/", async (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/hotel", hotelRoute);
app.use("/api/v1/hotel", roomRoute);
app.use("/api/v1/hotel", bookingRoute);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
