const express = require('express');
const kafka = require('kafka-node');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public'));

// Kafka Producer Configuration
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const producer = new Producer(client);

producer.on('ready', () => console.log('Kafka Producer is connected and ready'));
producer.on('error', (err) => console.error('Kafka Producer error:', err));

const moviesPath = path.join(__dirname, 'movies.json');
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));

app.get('/movies', (req, res) => {
  res.json(movies);
});


app.post('/select-movie', async (req, res) => {
  const { movieId, userData } = req.body;

  const movie = movies.find((m) => m.id === movieId);
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  const event = {
    movie,
    userData,
    timestamp: new Date()
  };

  producer.send([{ topic: 'counter', messages: JSON.stringify(event) }], (err, data) => {
    if (err) {
      console.error('Error sending event:', err);
      return res.status(500).json({ error: 'Failed to send event' });
    }
  });
});

app.listen(port, () => {
  console.log(`Producer server running at http://localhost:${port}`);
});
