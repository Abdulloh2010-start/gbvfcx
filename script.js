import movies from './movies.js';
const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");
const sortBy = document.getElementById("sortBy");
const searchButton = document.getElementById("searchButton");

function generator(movie) {
    movieContainer.innerHTML = '';

    let displayedMovies = 0;
    while (displayedMovies < 40 && displayedMovies < movie.length) {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="Снимок экрана 2025-02-20 195012.png" alt="0">
            <h3>${movie[displayedMovies].Title}</h3>
            <h4>Movie Year: ${movie[displayedMovies].movie_year}</h4>
            <p>${movie[displayedMovies].Categories}</p>
            <button>More info</button>
        `;

        movieContainer.appendChild(card);
        displayedMovies++;
    }
}

function searchMovie() {
    const search = searchInput.value.trim().toLowerCase();
    const filteredMovies = movies.filter(movie => {
        let title = movie.Title;
        if (typeof title !== "string") {
            title = String(title);
        }
        return title.toLowerCase().includes(search);
    });
    searchInput.value = ''
    generator(filteredMovies);
}



function sortMovies() {
    let sortedMovies = movies;
    if (sortBy.value === "alphabeticalAsc") {
        sortedMovies.sort((a, b) => ("" + a.Title).localeCompare("" + b.Title));
    } else if (sortBy.value === "alphabeticalDesc") {
        sortedMovies.sort((a, b) => ("" + b.Title).localeCompare("" + a.Title));
    } else if (sortBy.value === "weightAsc") {
        sortedMovies.sort((a, b) => a.movie_year - b.movie_year);
    } else if (sortBy.value === "weightDesc") {
        sortedMovies.sort((a, b) => b.movie_year - a.movie_year);
    }
    generator(sortedMovies);
}


function filterByType() {
    const selectedType = filterType.value.toLowerCase();
    let filteredMovies;
    if (selectedType === "all") {
        filteredMovies = movies;
    } else {
        filteredMovies = movies.filter(movie => 
            movie.Categories.toLowerCase().includes(selectedType)
        );
    }
    generator(filteredMovies);
}

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchMovie();
    }
});

searchButton.addEventListener("click", searchMovie);
sortBy.addEventListener("change", sortMovies);
filterType.addEventListener("change", filterByType);
generator(movies);