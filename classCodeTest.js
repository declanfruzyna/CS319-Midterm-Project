const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API     | 2
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=616122f3`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") movieSearchPropagator(data.Search);
    //else displayMovieList() JSON file data
}

//gets called by search     | 1
function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        console.log(searchTerm);
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

//                          | 3
function movieSearchPropagator(movies) {
    searchList.innerHTML = `<div id="col" class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 g-3"></div>`;
    // Find the element “col” in HTML
    var CardMovie = document.getElementById("col");

    // Read every movie from the array
    for (let i = 0; i < movies.length; i++) {

        let movieListCard = document.createElement('div');
        //movieListCard.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        
        if(movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else 
            moviePoster = "image_not_found.png";

        // add class = “col” to new division for Bootstrap
        movieListCard.classList.add("col");
        // create Bootstrap card
        movieListCard.innerHTML = `
            <div id=${movies[i].imdbID} class="card shadow-sm content-zone search-item-thumbnail search-list-item">
                <img src=${moviePoster} class="card-img-top" alt="..."></img>
                <div class="card-body">
                    <p class="card-text text"> <strong>${movies[i].Title}</strong>, ${movies[i].Year}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small class="text-body-secondary">9 mins</small>
                    </div>
                </div>
            </div>`;
        CardMovie.appendChild(movieListCard);

    }
    loadMovieDetails();
}

//on click pulls info from OMDb |4
function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});