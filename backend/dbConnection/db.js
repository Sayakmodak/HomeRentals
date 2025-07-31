import mongoose from "mongoose";
// mongodb+srv://sayak:<db_password>@homerentals.6kjncuc.mongodb.net/

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database connected");
    } catch (error) {
        console.log("error occured while connecting to the database", error);
    }
}

export default dbConnection;