import { User } from './../models/user.model.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { deleteImageFromCloudinary, uploadMedia } from '../Utils/cloudinary.js';

export const register = async (req, res) =>{
    try {
        const {name, email, role, password} = req.body;
        // console.log(name, email, role, password);

        // all fields are required  
        if(!name || !email || !password || !role){
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        // if the user already there in the database
        const isUser = await User.findOne({email});
        if(isUser){
            return res.status(401).json({
                success: false,
                message: "User already registered"
            })
        }

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // creating the user
        const user = await User.create({
            name: name,
            email: email,
            role: role,
            password: hashedPassword
        }) 

        return res.status(200).json({
            success: true,
            message: "User created",
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "can not register"
        })
    }
}


export const login = async (req, res) =>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(401).json({
                success: false,
                message: "all fields are required"
            })
        }

        // if the user is not present in the db
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "user not found"
            })
        }

        const matchedPassword = await bcrypt.compare(password, user.password);
        if(!matchedPassword){
            res.status(401).json({
                success: false,
                message: "incorrect credentials"
            })
        } 

        let options = {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true, // Cookie will not be exposed to client side code
        sameSite: "strict", // If client and server origins are same
        secure: true // use with HTTPS only
        }
        // generate the token and set the cookie in the browser
        const token = jwt.sign({id: user._id}, process.env.PRIVATE_KEY, {expiresIn: "1d"});
        // console.log(token);
        return res.status(200).cookie("token", token, options).json({
            success: true,
            user,
            token,
            message: `Welcome ${user.name}`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "can not login"
        })
    }
}

export const logout = async (req, res)=>{
    try {
        const token = res.cookie("token", "", {maxAge: 0}).json({
            success: true,
            message: "successfully logged out"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to logout"
        })
    }
}

export const getUserProfile = async (req, res) =>{
    try {
        const userId = req.id;

        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({
                success: false,
                message: "failed to get user profile"
            })
        }

        return res.status(200).json({
                success: true,
                message: "successfully get user profile",
                user: user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error occured while getting user profile"
        })
    }
}

export const updateUserProfile = async (req, res) =>{
    try {
        const userId = req.id;
        const {name} = req.body;
        const userImg = req.file;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "failed to get user profile"
            })
        }

        if(user.profileImg){
            const image = user.profileImg;
            const publicId = image.split("/").pop().split(".")[0];
            await deleteImageFromCloudinary(publicId);
        }        

        const cloudResponse = await uploadMedia(userImg.path);
        const profileUrl = cloudResponse.secure_url;

        const updatedData = {name, profileImg: profileUrl};
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new: true}).select("-password");

        return res.status(200).json({
            success: true,
            message: "User updated successfully", updatedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to update user profile"
        })
    }
}