const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function amqpConnect(error, connection) {
  if (error) throw error;

  connection.createChannel((error, channel) => {
    if (error) throw error;
    const queue = 'hello';
    const msg = 'Hello world';

    channel.assertQueue(queue, {
      durable: false
    });
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log('Send %s', msg);
  });
});
