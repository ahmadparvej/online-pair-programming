const express = require("express");
const ACTIONS = require("./src/Actions")

const app = express()

const http = require('http');

const {Server} = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

const userSocketMap= {}

function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId)||[]).map((socketId)=>{
        return {socketId,username:userSocketMap[socketId]}
    })
}

io.on('connection',(socket)=>{

    console.log("Socket connected",socket.id);

    socket.on(ACTIONS.JOIN,({roomId,username})=>{
        userSocketMap[socket.id] = username;
        socket.join(roomId)
        const clients = getAllConnectedClients(roomId)
        clients.forEach(({socketId})=>{
            io.to(socketId).emit(ACTIONS.JOINED,{
                clients,username,socketId:socket.id
            })
        })
    })

    socket.on("disconnecting",()=>{
        const rooms = [...socket.rooms];
        rooms.forEach((roomId)=>{
            socket.in(roomId).emit(ACTIONS.DISCONNECTED,{
                socketId: socket.id,
                username: userSocketMap[socket.id]
            });
        });
        delete userSocketMap[socket.id]
        socket.leave()
    })
});

const PORT = process.env.PORT || 8080

server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});