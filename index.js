const searchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const footerLoc = document.getElementById("footer");
const navSearchBox = document.getElementById("nav-search-box");
let navPrompt;
//add array on movies to track between pages

// load movies from API     | 2
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=616122f3`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if(data.Response == "True") movieSearchPropagator(data.Search);
}

//gets called by search     | 1
function findMovies(){
    let searchTerm = (searchBox.value).trim();
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
    footerLoc.classList.remove("fixed-bottom");

    // Read every movie from the array
    for (let i = 0; i < movies.length; i++) {

        let movieListCard = document.createElement('div');
        
        if(movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else 
            moviePoster = "./images/image_not_found.png";

        // add class = “col” to new division for Bootstrap
        movieListCard.classList.add("col");
        // create Bootstrap card
        //use innerHTML since doesnt always exist
        movieListCard.innerHTML = `
            <div id=${movies[i].imdbID} class="card shadow-sm content-zone search-item-thumbnail search-list-item">
                <a href="./moviePage.html#${movies[i].imdbID}"><img src=${moviePoster} class="card-img-top" alt="..."></img></a>
                <div class="card-body">
                    <p class="card-text text"> <strong>${movies[i].Title}</strong>, ${movies[i].Year}</p>
                    <div class="d-flex justify-content-between align-items-center">                   

                    </div>
                </div>
            </div>`;
        CardMovie.appendChild(movieListCard);
    }
}

window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});
