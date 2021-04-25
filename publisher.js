const amqp = require("amqplib");

amqp.connect(`amqp://localhost`, (err, connection) => {

  if (err) {
    console.log("Error", err);
  }

  let counter = 0;
  const queueName = "mqTest";
  const message = `Testing rabbitMQ Pub-Sub ${++counter}`;
  connection.createChannel(queueName, {
    durable: false,
  });

  connection.sendToQueue(queueName, Buffer.from(message));
  console.log(`Publisher: ${message}`);

  setTimeout(() => {
    connection.close();
  }, 1000);

})