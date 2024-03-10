let currentCastURL;

//On loading into Movie Page
async function loadDetails() {
    var a = window.location.href; //gets URL
    let movieId = (a.split('#').pop()); //gets After  #
    console.log(movieId);
    const result = await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=616122f3`);
    const movieDetails = await result.json();
    console.log(movieDetails);
    if(movieDetails.Response == "True") { 
      displayMovieDetails(movieDetails);
    }
}
async function loadCast(details) {
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmQ0MTYyNDkwNDBhNjM1MzA5ZTJjMmViYmE3MzJiOCIsInN1YiI6IjY1ZDk1ZmI4ZGQ0N2UxMDE3YzI4MDZlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.87g0A69s11m8xlI87sigWaYOdTDOMQ4zf0nITDG2Ccs'
    }
  };
  //
  await fetch(`https://api.themoviedb.org/3/search/person?query=${details[0]}%20${details[1]}&include_adult=false&language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => loadImage(response))
    .catch(err => console.error(err));
}
//used get element since all items will always exist
function displayMovieDetails(details) {
  //basic movie info
  document.getElementById("movie-title").innerText = `${details.Title}`;
  document.getElementById("movie-poster").src = `${(details.Poster != "N/A") ? details.Poster : "./images/image_not_found.png"}`;
  document.getElementById("movie-summary").innerText = `${details.Plot}`;
  //ratings
  document.getElementById("movie-IMDB").innerText = `IMDB: ${(details.Ratings.length >= "1") ? details.Ratings[0].Value : "N/A"}`;
  document.getElementById("movie-RTM").innerText = `Rotten Tomatoes: ${(details.Ratings.length >= "2") ? details.Ratings[1].Value : "N/A"}`;
  document.getElementById("movie-Metacritic").innerText = `Metacritic: ${(details.Ratings.length >= "3") ? details.Ratings[2].Value : "N/A"}`;
  //cards
  displayCastDetails(details);
  console.log(details.Title)
  addWatchNowButton(details);
}

//fills in card details
async function displayCastDetails(details) {
  //creates director card
  var director = details.Director.split(' ');
  await loadCast(director);
  if (currentCastURL == "https://image.tmdb.org/t/p/w500null") {
    currentCastURL = "N/A";
  }
  console.log(currentCastURL);
  document.getElementById("director-text").innerText = `${director[0]} ${director[1]}`;
  document.getElementById("director-image").src = `${(`${currentCastURL}` != "N/A") ? `${currentCastURL}` : "./images/image_not_found.png"}`;
  
  //creates cast cards
  var cast = details.Actors.split(',');
  cast[0] = ` ${cast[0]}`;
  console.log(cast);
  let i = 0;
  if (details.Actors != "N/A") {
    for (i=0; i < cast.length; i++) {
      actor = cast[i].substring(1).split(' ');
      await loadCast(actor);
      document.getElementById(`actor${i}-text`).innerText = `${actor[0]} ${actor[1]}`;
      document.getElementById(`actor${i}-image`).src = `${(currentCastURL != "N/A") ? currentCastURL : "./images/image_not_found.png"}`;
    }
  } else {
      console.log("N/A input")
      document.getElementById(`actor${0}-text`).innerText = "N/A";
      document.getElementById(`actor${0}-image`).src = "./images/image_not_found.png";
      document.getElementById(`actor${1}-text`).innerText = "N/A";
      document.getElementById(`actor${1}-image`).src = "./images/image_not_found.png";
      document.getElementById(`actor${2}-text`).innerText = "N/A";
      document.getElementById(`actor${2}-image`).src = "./images/image_not_found.png";
  }
}

function loadImage(data) {
  console.log(data);
  //currentCastURL = `https://image.tmdb.org/t/p/w500${data.results[0].profile_path}`;

//   try {
//     currentCastURL = `https://image.tmdb.org/t/p/w500${data.results[0].profile_path}`;
    
//  }
//  catch (exception) {
//     currentCastURL = "N/A";
//     console.log("no info found");
//  }

  if (data != null && 'results' in data && data.results.length > 0 && 'profile_path' in data.results[0]) {
    currentCastURL = `https://image.tmdb.org/t/p/w500${data.results[0].profile_path}`;
  } else {
    currentCastURL = "N/A";
  }


  //currentCastURL =  `${(data.results[0].profile_path === null) ? `https://image.tmdb.org/t/p/w500${data.results[0].profile_path}` : "N/A"}`;
}


window.onload = function() { 
  loadDetails();  //example function call. 
} 

// This function creates a Watch Now button
async function addWatchNowButton(details) {
  // Create the button element
  const watchNowButton = document.createElement('button');
  watchNowButton.textContent = 'Watch Now';
  watchNowButton.classList.add('watch-now-btn'); // Add a class for styling if needed
  console.log("successfully added button");
  // Add the click event listener to the button
  watchNowButton.addEventListener('click', function() {
    const titleWithPluses = details.Title.replace(/ /g, '-');
    const searchUrl = `https://123moviestv.net/search/${encodeURIComponent(titleWithPluses)}`;
    window.open(searchUrl, '_blank');
  });

  // Append the button to a container element on your page
  // Replace '.button-container' with the selector for the container you want to add the button to
  const container = document.querySelector('.container-watch-now-button');
  container.appendChild(watchNowButton);
  
}



