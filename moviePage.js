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
//used get element since all items will always exist
async function displayMovieDetails(details){
  //basic movie info
  document.getElementById("movie-title").innerText = `${details.Title}`;
  document.getElementById("movie-poster").src = `${(details.Poster != "N/A") ? details.Poster : "./images/image_not_found.png"}`;
  document.getElementById("movie-summary").innerText = `${details.Plot}`;
  //ratings
  document.getElementById("movie-IMDB").innerText = `IMDB: ${details.Ratings[0].Value}`;
  document.getElementById("movie-RTM").innerText = `${details.Ratings[1].Source}: ${details.Ratings[1].Value}`;
  document.getElementById("movie-Metacritic").innerText = `${details.Ratings[2].Source}: ${details.Ratings[2].Value}`;
  


  //creates director card
  var director = details.Director.split(' ');
  await loadCast(director);
  console.log(currentCastURL);
  document.getElementById("director-text").innerText = `${director[0]} ${director[1]}`;
  document.getElementById("director-image").src = `${(`${currentCastURL}` != "N/A") ? `${currentCastURL}` : "./images/image_not_found.png"}`;
  
  //creates cast cards
  var cast = details.Actors.split(',');
  cast[0] = ` ${cast[0]}`;
  console.log(cast);
  for (i=0; i < cast.length; i++) {
    actor = cast[i].substring(1).split(' ');
    await loadCast(actor);
    document.getElementById(`actor${i}-text`).innerText = `${actor[0]} ${actor[1]}`;
    document.getElementById(`actor${i}-image`).src = `${(currentCastURL != "N/A") ? currentCastURL : "./images/image_not_found.png"}`;
  }
  
}

function loadImage(data) {
  console.log(data);
  currentCastURL = `https://image.tmdb.org/t/p/w500${data.results[0].profile_path}`;
  //document.getElementById("director-image").src = `${(`https://image.tmdb.org/t/p/w500${data.results[0].profile_path}` != "N/A") ? `https://image.tmdb.org/t/p/w500${data.results[0].profile_path}` : "./images/image_not_found.png"}`;
}



 window.onload = function() { 
    loadDetails();  //example function call. 
  } 