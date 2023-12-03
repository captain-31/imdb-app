// movieService.js
const MovieService = (function () {
    const apiKey = 'fcc8a310';
    const url = 'http://www.omdbapi.com/';

    async function getMoviesByTitle(title) {
        const apiUrl = `${url}?s=${title}&apikey=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    }

    return {
        getMoviesByTitle,
    };
})();

// favoritesService.js
const FavoritesService = (function () {
    function addToFavorites(movie) {
        let moviesArray = JSON.parse(localStorage.getItem('imdbMovieData')) || [];

        let alreadyExists = moviesArray.some(existingMovie => existingMovie.mId === movie.mId);
        if (alreadyExists) {
            alert('Movie already exists.');
            return;
        }

        moviesArray.push(movie);
        localStorage.setItem('imdbMovieData', JSON.stringify(moviesArray));
        alert('Added to favourites!');
    }

    return {
        addToFavorites,
    };
})();

// uiService.js
const UIService = (function () {
    const moviesHTML = document.querySelector('.movies');

    function renderMovies(movies) {
        let html = '';

        movies.forEach(movie => {
            html += createMovieCard(movie);
        });

        moviesHTML.innerHTML = html;
    }

    function createMovieCard(movie) {
        return `
            <div class="card m-3 " style="width: 18rem;">
                ${getMovieImage(movie.Poster)}
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text">Year: ${movie.Year}</p>
                    <a href="movie.html?i=${movie.imdbID}" class="btn btn-primary" id="details">Details</a>
                    <a href="#" class="btn btn-outline-danger float-end" id="add-to-fav" data-id="${movie.imdbID}" data-image="${movie.Poster}" data-title="${movie.Title}">
                        Add to fav
                    </a>
                </div>
            </div>`;
    }

    function getMovieImage(poster) {
        return poster === 'N/A' || poster === undefined
            ? '<p class="text-center my-4">No image available</p>'
            : `<img src="${poster}"  style="width: 18rem;" class="card-img-top">`;
    }

    function showLoading() {
        moviesHTML.innerHTML = '<p>Loading...</p>';
    }

    function showError(error) {
        moviesHTML.innerHTML = `<p>${error}</p>`;
    }

    function activateListeners(addToFavHandler) {
        moviesHTML.addEventListener('click', function (e) {
            if (e.target.id === 'add-to-fav') {
                addToFavHandler(e);
            } else if (e.target.id === 'details') {
                document.querySelector('form').reset();
            }
        });
    }

    return {
        renderMovies,
        showLoading,
        showError,
        activateListeners,
    };
})();

// main.js
document.querySelector('#search').addEventListener('input', handleSearch);

async function handleSearch(e) {
    const title = e.target.value;

    // call api when length is more than 3 chars 
    if (title.length >= 3) {
        try {
            UIService.showLoading();
            const movies = await MovieService.getMoviesByTitle(title);
            console.log(movies)
            if (movies.Response === 'True') {
                UIService.renderMovies(movies.Search);
                UIService.activateListeners(addToFavourite);
            } else {
                UIService.showError(movies.Error);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }
}

function addToFavourite(e) {
    e.preventDefault();

    const movieId = e.target.getAttribute('data-id');
    const movieImage = e.target.getAttribute('data-image');
    const movieTitle = e.target.getAttribute('data-title');

    const newMovie = {
        'mId': movieId,
        'mImage': movieImage,
        'mTitle': movieTitle
    };

    FavoritesService.addToFavorites(newMovie);
}
