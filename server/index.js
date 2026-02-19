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

const io = new Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] }, maxHttpBufferSize: 10e6, });

io.on('connection', (socket) => {
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
    io.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log('A User disconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
