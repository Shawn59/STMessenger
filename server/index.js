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

// Хранилище подключенных пользователей (для примера)
const users = {};

io.on('connection', (socket) => {
  console.log('Новый пользователь подключился:', socket.id);

  // При авторизации клиент отправляет событие 'user_join'
  socket.on('user_join', (username) => {
    users[socket.id] = username;
    // Оповещаем всех, что новый пользователь вошёл
    io.emit('user_joined', username);
    console.log(`${username} присоединился к чату`);
  });

  // Обработка входящего сообщения
  socket.on('send_message', (data) => {
    // data = { message: 'текст', room?: '...' }
    const username = users[socket.id];
    if (username) {
      const messageData = {
        username,
        message: data.message,
        timestamp: new Date().toISOString(),
      };
      // Отправляем сообщение всем (можно фильтровать по комнате)
      io.emit('new_message', messageData);
    }
  });

  // Отключение пользователя
  socket.on('disconnect', () => {
    const username = users[socket.id];
    if (username) {
      delete users[socket.id];
      io.emit('user_left', username);
      console.log(`${username} покинул чат`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
