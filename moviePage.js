const resultGrid = document.getElementById('result-grid');
let currentCastURL;

//On loading into Movie Page
async function loadDetails () {
    var a = window.location.href; //gets URL
    let movieId = (a.split('#').pop()); //gets After  #
    console.log(movieId);
    const result = await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=616122f3`);
    const movieDetails = await result.json();
    //const review = await fetch('https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=jsYPOxL6Gk0EB8dUQ7G1t0pYZqeIbaPg');
    //const review2 = await fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${movieDetails.Title}&api-key=jsYPOxL6Gk0EB8dUQ7G1t0pYZqeIbaPg`);
    //const movieReview2 = await review2.json();
    console.log(movieDetails);
    if(movieDetails.Response == "True") displayMovieDetails(movieDetails);
}
async function loadCast(details) {
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmQ0MTYyNDkwNDBhNjM1MzA5ZTJjMmViYmE3MzJiOCIsInN1YiI6IjY1ZDk1ZmI4ZGQ0N2UxMDE3YzI4MDZlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.87g0A69s11m8xlI87sigWaYOdTDOMQ4zf0nITDG2Ccs'
    }
  };
    
  await fetch(`https://api.themoviedb.org/3/search/person?query=${details[0]}%20${details[1]}&include_adult=false&language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => loadImage(response))
    .catch(err => console.error(err));
    
  
}

async function displayMovieDetails(details){
  document.getElementById("movie-title").innerText = `${details.Title}`;
  document.getElementById("movie-poster").src = `${(details.Poster != "N/A") ? details.Poster : "./images/image_not_found.png"}`;
  document.getElementById("movie-summary").innerText = `${details.Plot}`;
  
  document.getElementById("movie-IMDB").innerText = `IMDB: ${details.Ratings[0].Value}`;
  document.getElementById("movie-RTM").innerText = `${details.Ratings[1].Source}: ${details.Ratings[1].Value}`;
  document.getElementById("movie-Metacritic").innerText = `${details.Ratings[2].Source}: ${details.Ratings[2].Value}`;
 
  var director = details.Director.split(' ');
  var cast = details.Actors.split(',');
  let actor0 = cast[0].split(' ');
  let actor1 = cast[1].substring(1).split(' ');
  let actor2 = cast[2].substring(1).split(' ');
  console.log(cast)
  await loadCast(director);
  console.log(currentCastURL);
  document.getElementById("director-image").src = `${(`${currentCastURL}` != "N/A") ? `${currentCastURL}` : "./images/image_not_found.png"}`;
  await loadCast(actor0);
  console.log(currentCastURL);
  document.getElementById("actor0-image").src = `${(currentCastURL != "N/A") ? currentCastURL : "./images/image_not_found.png"}`;
  await loadCast(actor1);
  document.getElementById("actor1-image").src = `${(currentCastURL != "N/A") ? currentCastURL : "./images/image_not_found.png"}`;
  await loadCast(actor2);
  document.getElementById("actor2-image").src = `${(currentCastURL != "N/A") ? currentCastURL : "./images/image_not_found.png"}`;
  
}

function loadImage(data) {
  console.log(data);
  currentCastURL = `https://image.tmdb.org/t/p/w500${data.results[0].profile_path}`;
  //document.getElementById("director-image").src = `${(`https://image.tmdb.org/t/p/w500${data.results[0].profile_path}` != "N/A") ? `https://image.tmdb.org/t/p/w500${data.results[0].profile_path}` : "./images/image_not_found.png"}`;
}



 window.onload = function() { 
    loadDetails();  //example function call. 
  } 