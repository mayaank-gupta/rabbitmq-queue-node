const amqp = require("amqplib");

amqp.connect(`amqp://localhost`, (err, channel) => {

  if (err) {
    console.log("Error", err);
  }

  let counter = 0;
  const queueName = "mqTest";
  const message = `Testing rabbitMQ Pub-Sub ${++counter}`;
  channel.assertQueue(queueName, {
    durable: false,
  });

  channel.consume(queueName, (msg) => {
    console.log(`Recieved: ${msg}`);
  })
  
})