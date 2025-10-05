import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

export const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_SECRET);
        console.log("Database Connected Successfully!!: ",conn.connection.host);
    } catch (error) {
        console.log("Faild Dabtabase Connection",error);
    }
}