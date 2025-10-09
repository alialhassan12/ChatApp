import jwt from 'jsonwebtoken';
import User from '../modules/User.js';
import 'dotenv/config';

export const protectRoute=async (req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token) return res.status(401).json({message:"Unautharized - No token provided"});

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({message:"Unautharized - Invalid token"});

        const user=await User.findById(decoded.userId).select("-password");//get all fields except password
        if(!user) return res.status(404).json({message:"User not Found"});

        req.user=user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware");
        res.status(500).json({message:"Internal server error"});
    }
}