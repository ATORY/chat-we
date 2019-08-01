const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error, connection) => {
  if (error) throw error;
  connection.createChannel((error, channel) => {
    if (error) throw error;
    const exchange = 'logs';
    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });

    channel.assertQueue(
      '',
      {
        exclusive: true
      },
      (error, q) => {
        if (error) throw error;
        channel.bindQueue(q.queue, exchange, '');
        channel.consume(
          q.queue,
          function(msg) {
            if (msg.content) {
              console.log(' [x] %s', msg.content.toString());
            }
          },
          {
            noAck: true
          }
        );
      }
    );
  });
});
