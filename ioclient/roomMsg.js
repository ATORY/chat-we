const io = require("socket.io-client");

const socket = io("http://localhost:9877?phone=12345678903", {
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 2 * 1000,
  autoConnect: true
});

socket.on("connect", () => {
  console.log(socket.id)
  socket.on("message", msg => {
    console.log(msg);
  });
  socket.on("roomJoined", msg => {
    console.log({ msg });
    socket.emit('roomMsg', {
        roomId: 'w2gnst2o7dj'
    })
  });
  socket.emit("joinRoom", { roomId: 'w2gnst2o7dj' });
});

socket.on("disconnect", msg => {
  socket.off("roomJoined");
  socket.off("message");
  console.log("disconnect...", msg);
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
