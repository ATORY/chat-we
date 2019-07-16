const http = require('http');
const url = require('url');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const socketIO = require('socket.io');

const app = new Koa();
const router = new Router();
const server = http.createServer(app.callback());
const io = socketIO(server);

const PORT = 9877;

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.use(bodyParser());

router.get('/', (ctx, next) => {
  // ctx.router available
});

router.post('/login', ctx => {
  const body = ctx.request.body;
  ctx.body = {
    token: body.phone
  };
});

app.use(router.routes()).use(router.allowedMethods());

const onLine = {};
const rooms = {};

/**
 * 正常情况下这个 ID 是要不可预测的。
 */
// io.engine.generateId = function(req) {
//   const urlObj = url.parse(req.url, true);
//   return urlObj.query.phone;
// };

// const nsp = io.of('/my-namespace');
// nsp.on('connection', function(socket){
//   console.log('someone connected');
// });
// nsp.emit('hi', 'everyone!');

io.on('connection', function(socket) {
  const socketID = socket.id;
  onLine[socketID] = socket;

  // socket.emit('hello', 'world');
  socket.on('chat', function(message) {
    // console.log(msg);
    // console.log(typeof msg)
    console.log(io.sockets.rooms);
    const { from, to, data } = message;
    if (onLine[to]) {
      console.log({ data });
      onLine[to].emit('chat', {
        from,
        to,
        msg: { type: 'string', data: data.msg }
      });
    } else {
      onLine[from].emit('chat-feedback', {
        from: 'sys',
        to,
        msg: { type: 'string', data: '对方未在线，消息未送达' }
      });
    }
    // console.log(onLine);
    // io.emit('chat', msg + '222222');
  });

  socket.on('createRoom', function() {
    console.log('createRoom');
    const roomIds = Object.keys(rooms);
    let roomId = Math.random()
      .toString(36)
      .substr(2);
    while (roomIds.includes(roomId)) {
      roomId = Math.random()
        .toString(36)
        .substr(2);
    }
    console.log({ roomId });
    rooms[roomId] = roomId;
    socket.join(roomId);
    socket.emit('roomJoined', roomId);
  });

  socket.on('joinRoom', function(message) {
    const { roomId } = message;
    socket.join(roomId);
    console.log(socket.rooms);
    socket.emit('roomJoined', roomId);
  });

  socket.on('roomMsg', ({ roomId, msg }) => {
    io.sockets.in(roomId).emit('message', {
      data: 'what is going on, party people?',
      roomId,
      msg,
      from: socket.id,
      random: Math.random()
        .toString(36)
        .substr(2)
    });
  });

  socket.on('disconnect', function() {
    console.log(delete onLine[socketID]);
  });
});

server.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
