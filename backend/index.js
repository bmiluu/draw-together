import express from "express";
import { createServer } from 'node:http'
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/lib/auth.js";
import { Server } from 'socket.io';


const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 8000;

app.all("/auth/{*any}", toNodeHandler(auth));

// Mount body-parsing middleware after the Better Auth handler.
app.use(express.json());

io.on('connection', (socket) => {
  console.log('a user connected');
});


server.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});