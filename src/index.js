const config = require('config');

const Producer = require('./Producer');
const Consumer = require('./Consumer');

const producer = new Producer(config);
const consumer = new Consumer(config);

producer.publish({ topic: config.kafkaTopic, messages: 'milk' });
consumer.consume();