const kafka = require('./node_modules/kafka-node');
const bodyParser = require('./node_modules/body-parser');

const Producer = require('../Producer');

class Kafka extends Producer {
    constructor ({ kafka_server = 'localhost:9092' }) {
        const { Producer, Client } = kafka;
        const client = new Client(kafka_server);
        this.producer = new Producer(client);
    }
    
    async publish (payload) {
        try {
            let pushStatus;
            this.producer.on('error', (err) => {
                console.log(`[kafka-producer -> ${payload.topic}]: connection failed`);
            });
            this.producer.on('ready', async () => {
                pushStatus = this.producer.send(payload, (err, data) => {
                    if (err) {
                        console.log(`[kafka-producer -> ${payload.topic}]: broker update failed`);
                    } else {
                        console.log(`[kafka-producer -> ${payload.topic}]: broker update success`);
                    }
                });
            });
            return pushStatus;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = Kafka;
