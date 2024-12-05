const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'analytics',
  brokers: ['kafka:9092'],
});

module.exports = { kafka };
