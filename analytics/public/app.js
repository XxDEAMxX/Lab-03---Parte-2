const socket = io();
const list = document.getElementById('top-movies');

socket.on('update', (movies) => {
  list.innerHTML = '';
  movies.forEach(([movie, count]) => {
    const li = document.createElement('li');
    li.textContent = `${movie} - ${count} visitas`;
    list.appendChild(li);
  });
});
