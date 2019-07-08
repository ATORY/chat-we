import io from 'socket.io-client';

const socket = io('http://localhost:9877?token=abc', {
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 2 * 1000,
  autoConnect: true
});
socket.on('connect', () => {
  if (socket.connected) {
    socket.on('hello', (msg) => {
      console.log({ msg })
    })
  } else {

  }
  console.log({ connected: socket.connected }); // true
});

socket.on('disconnected', (msg) => {
  console.log({ msg })
})

socket.on('reconnect', (attemptNumber) => {
  console.log({ attemptNumber })
});

socket.on('reconnect_error', (error) => {
  console.log('reconnecting..')
});
