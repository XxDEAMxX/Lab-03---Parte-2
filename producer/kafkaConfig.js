const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'producer',
  brokers: ['kafka:9092'],
});

module.exports = { kafka };
