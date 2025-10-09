import User from '../modules/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import { welcomeEmail } from '../emails/emailHandlers.js';
import cloudinary from '../lib/cloudinary.js';

export const signUp=async (req,res)=>{
    const {fullName,email,password} =req.body;
    try{

        if(!fullName || !email || !password){
            return res.status(400).json({message:"Must fill all Fields"});
        }
        if(password.length <6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }
        //check if email valid : use regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exist"});
        }
        
        //if all checks, hash the password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        
        //create new user
        const newUser=new User({
            fullName,
            email,
            password:hashedPassword
        });

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            });

            //send user welcome email
            try{
                await welcomeEmail(newUser.fullName,newUser.email,process.env.CLIENT_URL);
            }catch(err){
                console.log("Faild to send welcome email",err);
            }

        }else{
            res.status(400).json({message:"Invalid user data"});
        }
    }catch(err){
        console.log("Error in sign up controller",err);
        res.status(500).json({message:"Internal server error"});
    }
}

export const login =async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        
        if(!user) return res.status(400).json({message:"Invalid Credentials"});

        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials"});

        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        });
    }catch(err){
        console.log("Error in Login controller");
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const logout =(_,res)=>{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logout successfully!"});
}

export const updateProfile=async (req,res)=>{
    try{
        const {profilePic} =req.body;
        if(!profilePic) return res.status(400).json({message:"profile pic is required!"});

        const userId=req.user._id;

        const uploadResponse=await cloudinary.uploader.upload(profilePic);

        const updatedUser= await User.findByIdAndUpdate(
            userId,
            {profilePic:uploadResponse.secure_url},
            {new:true}
        ).select('-password');

        res.status(200).json(updatedUser);
    }catch(error){
        console.log("Error in updateProfile");
        res.status(500).json({message:"Internal server error "});
    }
}