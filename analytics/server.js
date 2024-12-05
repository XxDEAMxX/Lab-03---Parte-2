const express = require('express');
const { kafka } = require('./kafkaConfig');
const { setupSockets, updateClients } = require('./socket');

const app = express();
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor de analytics escuchando en http://localhost:${PORT}`);
});

const movieCounts = {};
const analyticsConsumer = kafka.consumer({ groupId: 'ka' });

setupSockets(server, movieCounts);

async function startConsumer() {
  console.log('Starting analytics consumer');
  await analyticsConsumer.connect();
  await analyticsConsumer.subscribe({ topic: 'counter', fromBeginning: true });

  await analyticsConsumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      console.log('Event received:', event);

      const movieTitle = event.movie.title;

      movieCounts[movieTitle] = (movieCounts[movieTitle] || 0) + 1;
      console.log('Movie counts:', movieCounts);

      updateClients(movieCounts, event);
    },
  });
}

startConsumer().catch((err) => console.error('Error in consumer:', err));

app.use(express.static('public'));
