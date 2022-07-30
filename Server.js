const express = require("express");
const ACTIONS = require("./src/Actions")
const path = require("path")
const cors = require("cors")
const port = process.env.PORT || 8080

const app = express()
app.use(cors())

const http = require('http');

const {Server} = require("socket.io");

app.use(express.static("build"))

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'build',"index.html"))
})

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });


const userSocketMap= {}

function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId)||[]).map((socketId)=>{
        return {socketId,username:userSocketMap[socketId]}
    })
}

io.on('connection',(socket)=>{

    console.log("Socket connected",socket.id);

    console.log("chat socket connected",socket.id)
    socket.on("joinRoom", room => {
          socket.join(room)
    })
  
    socket.on("newMessage", ({newMessage, room}) => {
      io.in(room).emit("getLatestMessage", newMessage)
    })

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

    socket.on(ACTIONS.CODE_CHANGE,({roomId, code})=>{
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE,{code})
    })
    socket.on(ACTIONS.SYNC_CODE,({socketId, code})=>{
        io.to(socketId).emit(ACTIONS.CODE_CHANGE,{code})
    })
});


server.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
