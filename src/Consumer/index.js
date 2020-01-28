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
            break;
        default:
            const fakeConsumer = new FakeConsumer();
            consumers[type] = fakeConsumer;
            break;
    }

    return consumers[type];
};

module.exports = {
    createConsumer: create
};
