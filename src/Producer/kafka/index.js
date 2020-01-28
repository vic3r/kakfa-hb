const kafka = require('kafka-node');

const Producer = require('../Producer');

class Kafka extends Producer {
    constructor ({ kafkaServer = 'localhost:9092' } = config) {
        super(config);
        const { Producer, Client } = kafka;
        const client = new Client(kafkaServer);
        this.producer = new Producer(client);
    }
    
    async publish (payload) {
        try {
            let pushStatus;
            this.producer.on('error', (err) => {
                console.log(`[kafka-producer -> ${payload.topic}]: connection failed ${err}`);
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
