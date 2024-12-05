const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'producer',
  brokers: ['192.168.1.15:9092'],
});

module.exports = { kafka };
