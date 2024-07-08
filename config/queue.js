
const amqp = require('amqplib/callback_api.js');

const rabbitmq = {

    connect: (retries = 5, delay = 5000) => {

        return new Promise((resolve, reject) => {
            amqp.connect(process.env.RABBITMQ_URL, (err, conn) => {
                if (err) {
                    if (retries === 0) {
                        console.error('--- Failed to connect to RabbitMQ after multiple attempts', err);
                        reject(err);
                    } else {
                        console.error(`--- Error connecting to RabbitMQ: ${err.message}. Retrying in ${delay / 1000} seconds...`);
                        setTimeout(() => rabbitmq.connect(retries - 1, delay), delay);
                    }
                } else {
                    console.log('--- Connected to RabbitMQ');
                    conn.on('error', (err) => {
                        console.error('--- RabbitMQ connection error', err);
                    });
                    conn.on('close', () => {
                        console.error('--- RabbitMQ connection closed. Exiting...');
                        process.exit(1);
                    });
                    resolve(conn);
                }
            });
        });

    },


    // createChannel: (connection) => {
    //     return new Promise((resolve, reject) => {
    //         connection.createChannel((error, channel) => {
    //             if (error) {
    //                 reject(`--- Error creating channel: ${error}`);
    //             } else {
    //                 resolve(`--- Created channel: ${channel}`);
    //             }
    //         });
    //     });
    // },

    
    // assertQueue: (channel, queue) => {
    //     return new Promise((resolve, reject) => {
    //         channel.assertQueue(queue, { durable: false }, (error, queue) => {
    //             if (error) {
    //                 reject(`--- Error asserting queue: ${error}`);
    //             } else {
    //                 resolve(`--- Asserted queue: ${queue.queue}`);
    //             }
    //         });
    //     });
    // },


    // sendToQueue: (channel, queue, message) => {
    //     return new Promise((resolve, reject) => {
    //         channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    //         resolve(`--- Sent message to queue: ${queue}`);
    //     });
    // }

};

module.exports = rabbitmq;
