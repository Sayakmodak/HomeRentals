import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv  from 'dotenv';
import dbConnection from "./dbConnection/db.js";
import userRoute from "./routes/userRoutes.js";
dotenv.config({});

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
// load the cookie-parsing middleware
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

dbConnection();

app.get("/", async (req, res)=>{
    res.send("Hello world");
})

app.use("/api/v1/user", userRoute);

app.listen(port, ()=>{
    console.log(`Server started at ${port}`);
})