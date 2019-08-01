#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error, connection) => {
  if (error) throw error;
  connection.createChannel((error, channel) => {
    const exchange = 'direct_logs';

    const args = process.argv.slice(2);
    const msg = args.slice(1).join(' ') || 'Hello World!';
    const severity = args.length > 0 ? args[0] : 'info';

    channel.assertExchange(exchange, 'direct', {
      durable: false
    });
    channel.publish(exchange, severity, Buffer.from(msg));
    console.log(" [x] Sent %s: '%s'", severity, msg);
  });
  // connection.on();
});
