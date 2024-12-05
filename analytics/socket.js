const socketIo = require('socket.io');

let io;

function setupSockets(server, movieCounts) {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Cliente conectado');
    socket.emit('update', getTopMovies(movieCounts));
  });
}

function updateClients(movieCounts, lastEvent) {
  if (io) {
    io.emit('update', {
      topMovies: getTopMovies(movieCounts),
      lastEvent
    });
  }
}

function getTopMovies(movieCounts) {
  return Object.entries(movieCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
}

module.exports = { setupSockets, updateClients };
