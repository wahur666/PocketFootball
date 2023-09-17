import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { JSONFile } from 'lowdb/node'
import { Low } from "lowdb";

class Session {
    sessionId: string;
    expiry: Date;
}

class User {
    username: string;
    password: string;
    score: number;
    session: Session[]

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
        this.score = 0;
        this.session = [];
    }
}

type Data = {
    users: User[];
    posts: string[];
}

const adapter = new JSONFile<Data>("./users.json");
const defaultData = { users: [], posts: [] };
const db = new Low(adapter, defaultData);

// Read data from JSON file, this will set db.data content
// If JSON file doesn't exist, defaultData is used instead
await db.read()

// Create and query items using plain JavaScript
db.data.posts.push('hello world')
const firstPost = db.data.posts[0]

// If you don't want to type db.data everytime, you can use destructuring assignment
const { posts } = db.data
posts.push('hello world')

// Finally write db.data content to file
await db.write()


const app = express();
app.use(express.static("../dist"))
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
// @ts-ignore
  cors: "*"
});

io.on("connection", (socket) => {
  console.log("A user connected");
});

server.listen(4000, "0.0.0.0", () => {
    console.log("listening on :4000");
});
