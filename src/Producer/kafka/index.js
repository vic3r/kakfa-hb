const kafka = require('kafka-node');

const Producer = require('../Producer');

class Kafka extends Producer {
    constructor (config) {
        super(config);
        const { kafkaServer } = config || 'localhost:9092';
        const { Producer, KafkaClient } = kafka;
        const client = new KafkaClient(kafkaServer);
        this.producer = new Producer(client);
    }
    
    async publish (payload) {
        try {
            let pushStatus;
            this.producer.on('error', (err) => {
                console.log(`[kafka-producer: connection failed ${err}`);
            });
            this.producer.on('ready', async () => {
                pushStatus = await this.producer.send(payload, (err, data) => {
                    if (err) {
                        console.log(`[kafka-producer -> ${data}]: broker update failed`);
                    } else {
                        console.log(`[kafka-producer -> ${data}]: broker update success`);
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
