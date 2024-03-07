const resultGrid = document.getElementById('result-grid');


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

function displayMovieDetails(details){
    document.getElementById("movie-title").innerText = `${details.Title}`;
    document.getElementById("movie-poster").src = `${(details.Poster != "N/A") ? details.Poster : "./images/image_not_found.png"}`;
    document.getElementById("movie-summary").innerText = `${details.Plot}`;
    
    document.getElementById("movie-IMDB").innerText = `IMDB: ${details.Ratings[0].Value}`;
    document.getElementById("movie-RTM").innerText = `${details.Ratings[1].Source}: ${details.Ratings[1].Value}`;
    document.getElementById("movie-Metacritic").innerText = `${details.Ratings[2].Source}: ${details.Ratings[2].Value}`;

    // resultGrid.innerHTML = `
    // <div class = "movie-poster">
    //     <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    // </div>
    // <div class = "movie-info">
    //     <h3 class = "movie-title">${details.Title}</h3>
    //     <ul class = "movie-misc-info">
    //         <li class = "year">Year: ${details.Year}</li>
    //         <li class = "rated">Ratings: ${details.Rated}</li>
    //         <li class = "released">Released: ${details.Released}</li>
    //     </ul>
    //     <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
    //     <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
    //     <p class = "actors"><b>Actors: </b>${details.Actors}</p>
    //     <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
    //     <p class = "language"><b>Language:</b> ${details.Language}</p>
    //     <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    // </div>
    // `;
 }
 window.onload = function() { 
    loadDetails();  //example function call. 
  } 