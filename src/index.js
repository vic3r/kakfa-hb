const config = require('config');

const Producer = require('./Producer');
const producer = new Producer(config);

producer.publish({ topic: config.kafka_topic, messages: 'milk' });