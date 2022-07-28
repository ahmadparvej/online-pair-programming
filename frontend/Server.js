const express = require("express");

const app = express()
const http = require('http');
const {Server} = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

io.on('connection',(socket)=>{
    console.log("Socket connected",socket.id);
});

const PORT = process.env.PORT || 6000

server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});
