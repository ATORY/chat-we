const Koa = require('koa');
const app = new Koa();

const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

const PORT = 9877;

app.use(async ctx => {
  ctx.body = 'Hello World';
});

io.on('connection', function(socket) {
  console.log('connected');
  socket.emit('hello', 'world');
  socket.on('chat', function(msg) {
    console.log(msg);
    io.emit('chat', msg + '222222');
  });
});

server.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
