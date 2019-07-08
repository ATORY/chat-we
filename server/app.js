const http = require('http');

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

const rooms = {
};


io.on('connection', function(socket) {
  console.log('connected', socket.id, socket.request, socket.rooms);
  socket.emit('hello', 'world');
  socket.on('chat', function(msg) {
    console.log(msg);
    io.emit('chat', msg + '222222');
  });
  socket.on('say to someone', function(id, msg) {
    socket.broadcast.to(id).emit('my message', msg);
  });
});

server.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
