const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error, connection) => {
  if (error) throw error;
  connection.createChannel((err, channel) => {
    const exchange = 'logs';
    const msg = process.argv.slice(2).join(' ') || 'Hello world';

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });

    channel.publish(exchange, '', Buffer.from(msg));
    console.log('Send %s', msg);
  });
});
