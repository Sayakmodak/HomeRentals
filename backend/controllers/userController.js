import { User } from './../models/user.model.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const register = async (req, res) =>{
    try {
        const {name, email, password} = req.body;

        // all fields are required
        if(!name || !email || !password){
            return res.status(401).json({
                success: false,
                message: "all fields are reuqired"
            })
        }

        // if the user already there in the database
        const isUser = await User.findOne({email});
        if(isUser){
            return res.status(401).json({
                success: false,
                message: "user already registered"
            })
        }

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        // creating the user
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        }) 
        // await User.save();

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
        console.log(token);
        return res.status(200).cookie("token", token, options).json({
            success: true,
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