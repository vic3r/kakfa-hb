const KafkaProducer = require('./kafka');
const FakeProducer = require('./fake');
const factories = {};

const create = (config) => {
    const { type } = config;
    if (factories[type]) {
        return factories[type]
    }
    switch (type) {
        case 'Kafka':
            const kafkaProducer = new KafkaProducer(config);
            factories[type] = kafkaProducer;
        default:
            const fakeProducer = new FakeProducer();
            factories[type] = fakeProducer;
    }

    return factories[type];
};

module.exports = {
    createProducer: create
};
