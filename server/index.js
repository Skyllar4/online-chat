import mongoose from 'mongoose';
import express from 'express';
import * as userController from './controllers/userController.js';
import * as chatController from './controllers/chatController.js';
import checkauth from "./utils/checkauth.js";
import * as dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import ChatModel from "./models/ChatList.js";

dotenv.config(); // переменные окружения

mongoose
.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.BD_PASS}@cluster0.87ueqch.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then(() => {
    console.log('DB OK');
}).catch((err) => console.log("DB error " + err));

const app = express();
app.use(express.json());

app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/profile', checkauth, userController.auth);
app.get('/chat', chatController.getChatData);
app.post('/chat/create', chatController.createMessage); // Вынести в роуты

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    try {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
      socket.on('chat message', (msg) => {
            const doc = new ChatModel({
                chatList: msg
            });
            doc.save();
       });
    }
    catch (err) {
        console.log(err)
    }
});

server.listen(200, (err) => {
    if (err) {
        return console.log(err);
    } 
    console.log('OK');
});
