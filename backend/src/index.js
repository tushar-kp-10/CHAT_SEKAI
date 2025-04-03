import express from "express";
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js";;
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js"
import cors from 'cors';
import { app,server } from "./lib/socket.js";

dotenv.config()
// const app=express();

const PORT = process.env.PORT;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))



app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

server.listen(PORT,()=>{
    console.log("server is running on port:"+PORT);
    connectDB();
});