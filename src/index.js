const config = require('config');

const { createProducer } = require('./producer');
const { createConsumer } = require('./consumer');

const producer = createProducer(config);
const consumer = createConsumer(config);

producer.publish([{ topic: config.kafkaTopic, messages: 'milk' }]);
consumer.consume();
