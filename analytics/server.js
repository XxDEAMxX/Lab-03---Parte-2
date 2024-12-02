const express = require('express');
const { kafka } = require('./kafkaConfig');
const { setupSockets, updateClients } = require('./sockets');

const app = express();
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor de analytics escuchando en http://localhost:${PORT}`);
});

const movieCounts = {};
const analyticsConsumer = kafka.consumer({ groupId: 'analytics-group' });

setupSockets(server, movieCounts);

async function startConsumer() {
  await analyticsConsumer.connect();
  await analyticsConsumer.subscribe({ topic: 'show-interactions', fromBeginning: true });

  await analyticsConsumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      const movieName = event.movieName;

      movieCounts[movieName] = (movieCounts[movieName] || 0) + 1;
      updateClients(movieCounts);
    },
  });
}

startConsumer().catch(console.error);

// Archivos estáticos
app.use(express.static('public'));
