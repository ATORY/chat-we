const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function amqpConnect(error, connection) {
  if (error) throw error;
  connection.createChannel((error, channel) => {
    if (error) throw error;
    const queue = 'hello';
    channel.consume(
      queue,
      msg => {
        console.log(msg.content.toString());
      },
      { noAck: true }
    );
  });
});
