
const amqp = require('amqplib/callback_api.js');

let queues = {
    upload_queue: 'upload_queue'
};


const connectRabbitMQ = ((callback) => {
    amqp.connect(process.env.RABBITMQ_URL, (error, connection) => {
        if (error) {
            throw error;
        }
        connection.createChannel((error, channel) => {
            if (error) {
                throw error;
            }
            callback(channel);
        });
    });
});


const initializeQueue = ((channel) => {
    Object.keys(queues).forEach((queue) => {
        channel.assertQueue(queues[queue], { durable: false });
    });
});


const sendToUploadQueue = ((message) => {
    connectRabbitMQ((channel) => {
        initializeQueue(channel);
        channel.sendToQueue(queues.upload_queue, Buffer.from(message));
    });
});


module.exports = {
    sendToUploadQueue
}