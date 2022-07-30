
const express = require("express")
const { Server } = require("socket.io");
var http = require('http');
const cors = require("cors")
app.use(cors())

const app = express()

var server = http.createServer(app);

const io = new Server(server, );

app.get("/", (req, res) => {res.send("Chat BE with Socket.io by Gyan prakash"); res.end()})



server.listen(8080, console.log("App started at 8000"))