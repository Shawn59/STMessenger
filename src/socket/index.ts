import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';

const socket = io(SERVER_URL);

socket.on('connect', () => {
  console.log('Connected to server');
});
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('error', (error) => {
  console.error('Socket error:', error);
});
socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

export default socket;
