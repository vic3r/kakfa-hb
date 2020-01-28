const kafka = require('kafka-node');

const Consumer = require('../Consumer');

class Kafka extends Consumer {
    constructor (config) {
        super(config);
        const { kafkaServer = 'localhost:9092', kafkaTopic = '', partition = 0 } = config;
        const { Consumer, KafkaClient } = kafka;
        const client = new KafkaClient(kafkaServer);
        this.consumer = new Consumer(
            client,
            [{ topic: kafkaTopic, partition }],
            {
              autoCommit: true,
              fetchMaxWaitMs: 1000,
              fetchMaxBytes: 1024 * 1024,
              encoding: 'utf8',
              fromOffset: false
            }
        );
    }

    async consume () {
        try {
            this.consumer.on('error', (err) => {
                console.log(`error: ${err}`);
            });
            this.consumer.on('message', async (msg) => {
                console.log(`kafka -> ${msg.value}`);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = Kafka;
