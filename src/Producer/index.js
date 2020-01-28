const KafkaProducer = require('./kafka');
const FakeProducer = require('./fake');
const producers = {};

const create = (config) => {
    const { type } = config;
    if (producers[type]) {
        return producers[type]
    }
    switch (type) {
        case 'kafka':
            const kafkaProducer = new KafkaProducer(config);
            producers[type] = kafkaProducer;
        default:
            const fakeProducer = new FakeProducer();
            producers[type] = fakeProducer;
    }

    return producers[type];
};

module.exports = {
    createProducer: create
};
