const socket = io();
const list = document.getElementById('top-movies');

socket.on('update', (movies) => {
  list.innerHTML = '';
  movies.forEach(([movieTitle, count]) => {
    const li = document.createElement('li');
    li.textContent = `${movieTitle} - ${count} visitas`;
    list.appendChild(li);
  });
});
