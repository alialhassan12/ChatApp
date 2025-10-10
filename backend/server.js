import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';

//import routes
import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';

dotenv.config()

const app=express();
async function startServer(){
    await connectDB();
    app.listen(PORT,()=>console.log(`Server Running On Port ${PORT}`));
}

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoute);
app.use('/api/message',messageRoute);

const PORT=process.env.PORT;
startServer();