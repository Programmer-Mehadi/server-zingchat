import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"

const app = express()
const server = createServer(app)

const io = new Server(server)

app.use(cors())

let messages = []

io.on("connection", (socket) => {
  // Send existing messages to the connected user
  socket.emit("messages", messages)

  socket.on("message", (message) => {
    // Broadcast the new message to all connected users
    io.emit("message", message)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
})

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>")
})

server.listen(3000, () => {
  console.log("server running at http://localhost:3000")
})
