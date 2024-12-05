const socket = io();
const list = document.getElementById('top-movies');
const messageList = document.getElementById('event-messages');

socket.on('update', ({ topMovies, lastEvent }) => {
  // Actualizar lista de contadores de películas
  list.innerHTML = '';
  topMovies.forEach(([movieTitle, count, posterUrl]) => {
    const li = document.createElement('li');

    // Crear el texto
    const text = document.createElement('span');
    text.textContent = `${movieTitle} - ${count} visitas`;

    li.appendChild(text);
    list.appendChild(li);
  });

  // Mostrar mensaje completo del último evento recibido
  if (lastEvent) {
    const li = document.createElement('li');
    li.textContent = JSON.stringify(lastEvent, null, 2); // Mostrar formato JSON con sangría
    messageList.prepend(li); // Añadir el último mensaje al principio
  }
});
