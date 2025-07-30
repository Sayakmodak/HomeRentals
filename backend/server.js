import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv  from 'dotenv';
dotenv.config({});

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.get("/", async (req, res)=>{
    res.send("Hello world");
})

app.listen(port, ()=>{
    console.log(`Server started at ${port}`);
})