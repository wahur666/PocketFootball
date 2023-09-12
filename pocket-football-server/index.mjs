import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: "*"
});


app.get("/", (req, res) => {
  res.send("Hello world");
});

io.on("connection", (socket) => {
  console.log("A user connected");
});

server.listen(4000, "0.0.0.0", () => {
    console.log("listening on :4000");
});
