
const amqp = require('amqplib/callback_api.js');

const rabbitmq = {

    connect: () => {
        return new Promise((resolve, reject) => {
            amqp.connect(process.env.RABBITMQ_URL, (error, connection) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(`--- Connected to RabbitMQ: ${connection}`);
                    resolve(connection);
                }
            });
        });
    },

    createChannel: (connection) => {
        return new Promise((resolve, reject) => {
            connection.createChannel((error, channel) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(`--- Created channel: ${channel}\n`);
                    resolve(channel);
                }
            });
        });
    },

    assertQueue: (channel, queue) => {
        return new Promise((resolve, reject) => {
            channel.assertQueue(queue, { durable: false }, (error, queue) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(`--- Asserted queue: ${queue.queue}\n`);
                    resolve(queue);
                }
            });
        });
    },

    sendToQueue: (channel, queue, message) => {
        return new Promise((resolve, reject) => {
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
            console.log(`--- Sent message to queue: ${queue}\n`);
            resolve();
        });
    }

};

module.exports = rabbitmq;
