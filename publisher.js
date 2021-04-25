const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, connection) => {

  if (err) {
    console.log("Error", err);
  }

  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    let counter = 0;
    const queueName = "mqTest";
    const message = `Testing rabbitMQ Pub-Sub ${++counter}`;

    channel.assertQueue(queueName, {
      durable: false
    });

    connection.sendToQueue(queueName, Buffer.from(message));
    console.log(`Publisher: ${message}`);
  });

  setTimeout(() => {
    connection.close();
  }, 1000);

})