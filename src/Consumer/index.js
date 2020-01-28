const KafkaConsumer = require('./kafka');
const FakeConsumer = require('./fake');
const consumers = {};

const create = (config) => {
    const { type } = config;
    if (consumers[type]) {
        return consumers[type]
    }
    switch (type) {
        case 'kafka':
            const kafkaConsumer = new KafkaConsumer(config);
            consumers[type] = kafkaConsumer;
        default:
            const fakeConsumer = new FakeConsumer();
            consumers[type] = fakeConsumer;
    }

    return consumers[type];
};

module.exports = {
    createConsumer: create
};
