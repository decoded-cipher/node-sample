
const amqp = require('amqplib/callback_api.js');

let channel;
let queues = {
    upload_queue: 'upload_queue'
};


const connectRabbitMQ = (async () => {
    amqp.connect(process.env.RABBITMQ_URL, (error, connection) => {
        if (error) {
            console.error('--- Error connecting to RabbitMQ: ', error);
            return;
        }
        
        console.log('--- RabbitMQ connected');
        
        connection.createChannel((error, ch) => {
            if (error) {
                console.error('--- Error creating channel: ', error);
                return;
            }
            
            console.log('--- Channel created');
            channel = ch;
            initializeQueue(channel);
            console.log('--- Queues initialized');
        });
    });
});


const initializeQueue = ((channel) => {
    Object.keys(queues).forEach((queue) => {
        channel.assertQueue(queues[queue], { durable: false });
    });
});


const sendToUploadQueue = ((message) => {
    channel.sendToQueue(queues.upload_queue, Buffer.from(message));
    console.log('--- Message sent to upload_queue');
});


module.exports = {
    connectRabbitMQ,
    sendToUploadQueue
}