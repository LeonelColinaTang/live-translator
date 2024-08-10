import express from 'express';
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cookieParser from "cookie-parser";
import { app, server } from './socket/socket.js';

import dotenv from 'dotenv';
dotenv.config();
// const app = express();


app.use(express.json()); //This is to parse the json responses
app.use(cookieParser()); //for parsing application/json


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)

server.listen(5000, () =>{
    console.log("Server is running on port 5000");
})

// TODO: Add Socket.io to the server
// TODO: Configure this server for deployment