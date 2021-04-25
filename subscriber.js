const amqp = require("amqplib/callback_api");

amqp.connect(`amqp://localhost`, (err, channel) => {

  if (err) {
    console.log("Error", err);
  }

  channel.createChannel(function (error1, channel) {
    if (error1) {
      console.log("Error", error1);
      throw error1;
    }

    const queueName = "mqTest";

    channel.assertQueue(queueName, {
      durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);

    channel.consume(queueName, function (msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {
      noAck: true
    });
  });

})