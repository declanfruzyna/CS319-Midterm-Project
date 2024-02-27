//Declan Fruzyna
//dfruzyna@iastate.edu
//Feb 23, 2024

fetch("./apiCallOutputs.json")
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies));

function loadMovies(myMovies) {
    // Find the element “col” in HTML
    var CardMovie = document.getElementById("col");

    var checkboxes = [];
    var cards = [];

    // Read every movie from the array
    for (var i = 0; i < myMovies.movies.length; i++) {
        let checkbox = "checkbox" + i.toString();
        let card = "card" + i.toString();


        let title = myMovies.movies[i].title;
        let year = myMovies.movies[i].year;
        let url = myMovies.movies[i].url;

        // create a new HTML div division
        let AddCardMovie = document.createElement("div");
        // add class = “col” to new division for Bootstrap
        AddCardMovie.classList.add("col");
        // create Bootstrap card
        AddCardMovie.innerHTML = `
            <div id=${card} class="card shadow-sm">
                <img src=${url} class="card-img-top" alt="..."></img>
                <div class="card-body">
                    <p class="card-text"> <strong>${title}</strong>, ${year}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small class="text-body-secondary">9 mins</small>
                    </div>
                </div>
            </div>`;
        // append new division
        CardMovie.appendChild(AddCardMovie);

        // let cbox = document.getElementById(checkbox);
        // checkboxes.push(cbox);
        // let ccard = document.getElementById(card);
        // cards.push(ccard);

        // explore console
        // console.log(checkbox);
        console.log(card);
    } // end of for
    console.log(cards);

    // // Add event listeners to checkboxes to toggle card visibility
    // checkboxes.forEach((checkboxParam, index) => {
    //     console.log(index);
    //     checkboxParam.addEventListener('change', () => {
    //         if (checkboxParam.checked) {
    //             cards[index].style.display = 'block'; // Show the card
    //         } else {
    //             cards[index].style.display = 'none'; // Hide the card
    //         }
    //     });
    // });
} // end of function