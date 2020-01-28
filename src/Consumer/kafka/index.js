const kafka = require('kafka');

const Consumer = require('../Consumer');

class Kafka extends Consumer {
    constructor ({ kafkaServer = 'localhost:9092', kafkaTopic = '', partition = 0 } = config) {
        super(config);
        const { HighLevelConsumer, Client } = kafka;
        const client = new Client(kafkaServer);
        this.consumer = new HighLevelConsumer(
            client,
            [{ topic: kafkaTopic, partition}],
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
