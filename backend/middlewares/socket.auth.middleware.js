import jwt from 'jsonwebtoken';
import User from '../modules/User.js';

export const socketAuthMiddleware =async(socket,next)=>{
    try {
        //extract token from http-only cookies
        const token=socket.handshake.headers.cookie
            ?.split("; ")
            .find((row)=>row.startsWith("jwt="))
            ?.split("=")[1];
        
        //check if token valid
        if(!token){
            console.log("Socket connection rejected: No token provided");
            return next(new Error("Unautharized - No Token provided"));
        }
        
        //verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            console.log("Socket connection rejected: Invalid token provided");
            return next(new Error("Unautharized - Invalid Token provided"));
        }

        //find user from database
        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            console.log("Socket connection rejected: User not Found");
            return next(new Error("Unautharized - User not Found"));
        }

        //attach user info into socket
        socket.user=user;
        socket.userId=user._id.toString();

        console.log(`Socket authenticated for user ${user.fullName} (${user._id})`);
        next()
    } catch (error) {
        console.log("Error in socket authentication: ",error);
        next(new Error("Unautharized - Authentication failed "))
    }
}