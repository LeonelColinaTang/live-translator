import { Server } from "socket.io";
import http from 'http';
import express from 'express';
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

export const getReceiverSocketId = (receiverId: string) =>{
    return userSocketMap[receiverId];
}

const userSocketMap: {[key: string]:string} = {} // {userId: socketId}
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    // Here we are gettinbg the user id from the socket so we can put it in the online users
    const userId = socket.handshake.query.userId as string;
    if(userId){
      userSocketMap[userId] = socket.id;
    }
    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    // socket.on() is used to listen to the events. It can be used on both client and server side
    socket.on("disconnect", () =>{
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});
export {app, io, server}