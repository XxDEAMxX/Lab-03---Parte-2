// Fetch and display movies
async function loadMovies() {
    const response = await fetch('/movies');
    const movies = await response.json();
  
    const moviesContainer = document.getElementById('movies-container');
    movies.forEach((movie) => {
      const movieCard = document.createElement('div');
      movieCard.className = 'movie-card';
      movieCard.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
        <p>${movie.description}</p>
        <button onclick="selectMovie(${movie.id})">Select</button>
      `;
      moviesContainer.appendChild(movieCard);
    });
  }
  
  // Handle movie selection
  async function selectMovie(movieId) {
    const userData = {
      name: prompt('Enter your name:'),
      age: parseInt(prompt('Enter your age:'), 10),
      email: prompt('Enter your email (parent email if minor):')
    };
  
    if (!userData.name || isNaN(userData.age) || !userData.email) {
      alert('Please provide valid user data.');
      return;
    }
  
    const response = await fetch('/select-movie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId, userData })
    });
  
    if (response.ok) {
      alert('Movie selection event sent successfully!');
    } else {
      alert('Failed to send event.');
    }
  }
  
  // Initialize
  document.addEventListener('DOMContentLoaded', loadMovies);
  