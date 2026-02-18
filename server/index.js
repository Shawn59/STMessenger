import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import route from './route.js';

const app = express();
const PORT = 5000;

app.use(cors({ origin: '*' }));
app.use(route);

const server = http.createServer(app);

const io = new Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });

io.on('connection', (socket) => {
  // console.log('Новый пользователь подключился:', socket.id);
  /* const username = socket.handshake.query.username || 'Аноним';
  console.log(`User connected: ${username} (socket: ${socket.id})`);*/
  console.log('A User connected', socket.id);

  socket.emit('message', {
    id: 'Test-a4f903sdfa9d-5ec11e0eefc22',
    text: 'Привет, коллега!',
    user: {
      firstName: 'Тест',
      lastName: 'Тестовиков',
      profession: 'Тестер',
      id: 'Test303936d5sdfsdf',
    },
    senderId: 'MtzYKG0qHULbWSDSAAAF232dsf21312',
    timestamp: '2026-02-15T10:53:24.781Z',
  });

  socket.on('message', (message) => {
    /* console.log('Message received:', message);*/
    //socket.broadcast.emit("message", message);
    io.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log('A User disconnected', socket.id);
  });

  /*  // При авторизации клиент отправляет событие 'user_join'
  socket.on('user_join', (username) => {
    users[socket.id] = username;
    // Оповещаем всех, что новый пользователь вошёл
    io.emit('user_joined', username);
    console.log(`${username} присоединился к чату`);
  });*/

  /* // При получении сообщения от клиента рассылаем его всем
  socket.on('chat message', (msg) => {
    const messageData = {
      username,
      text: msg,
      timestamp: new Date().toISOString(),
    };
    io.emit('chat message', messageData); // отправляем всем, включая отправителя
  });

  // Отключение пользователя
  socket.on('disconnect', () => {
    const username = users[socket.id];
    if (username) {
      delete users[socket.id];
      io.emit('user_left', username);
      console.log(`${username} покинул чат`);
    }
  });*/
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
