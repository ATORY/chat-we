const io = require("socket.io-client");

const socket = io("http://localhost:9877?phone=12345678901", {
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 2 * 1000,
  autoConnect: true
});

socket.on("connect", () => {
  socket.on('chat-feedback', msg => {
    console.log(msg)
  })
  socket.on('chat', msg => {
      console.log(msg)
  })

  socket.on('room', (msg) => {
    console.log('room', msg)
  })

  socket.on("hello", msg => {
    console.log({ msg });
    socket.emit('chat', {from: '12345678901', to: '12345678902', msg: { type: 'string', data: 'hi' }})
  });

  // socket.emit('createRoom', (msg) => {
  //   console.log({ msg })
  // });

  socket.emit('joinRoom', { roomId: '69qhkb7lw39' })
  socket.on('hi', msg => {
    console.log('hi', msg)
  })

  console.log({ connected: socket.connected }); // true
});

socket.on("disconnected", msg => {
  console.log({ msg });
});

socket.on("reconnect", attemptNumber => {
  console.log({ attemptNumber });
});

socket.on("reconnect_error", error => {
  console.log("reconnecting..");
});

socket.on("close", () => {
  console.log("closed");
});
