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
io.engine.generateId = function(req) {
  const urlObj = url.parse(req.url, true);
  return urlObj.query.phone;
};

// const nsp = io.of('/my-namespace');
// nsp.on('connection', function(socket){
//   console.log('someone connected');
// });
// nsp.emit('hi', 'everyone!');

io.on('connection', function(socket) {
  console.log('connected');
  // IncomingMessage 可做验证？
  // console.log(socket.request.url);
  // console.log(socket.id);
  // console.log(socket.rooms);

  const socketID = socket.id;
  onLine[socketID] = socket;

  // socket.emit('hello', 'world');
  socket.on('chat', function(message) {
    // console.log(msg);
    // console.log(typeof msg)
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
    const roomIds = Object.keys(rooms);
    let roomId = Math.random()
      .toString(36)
      .substr(2);
    while (roomIds.includes(roomId)) {
      roomId = Math.random()
        .toString(36)
        .substr(2);
    }
    rooms[roomId] = io.of(`/${roomId}`);
  });

  socket.on('say to someone', function(id, msg) {
    socket.broadcast.to(id).emit('my message', msg);
  });
  socket.on('disconnect', function() {
    console.log(delete onLine[socketID]);
    // console.log({ onLine });
  });
});

server.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
