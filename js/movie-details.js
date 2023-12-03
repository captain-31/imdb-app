// movieService.js
const MovieService = (function () {
    const apiKey = 'fcc8a310';
    const url = 'https://www.omdbapi.com/';

    async function getMovieById(id) {
        const apiUrl = `${url}?i=${id}&apikey=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    }

    return {
        getMovieById,
    };
})();

// uiService.js
const UIService = (function () {
    const movieHtml = document.querySelector('.movie-data');

    function renderMovieDetails(movie) {
        const html = `

            <div class='col-12 col-md-4 my-3'>
                ${movie.Poster == 'N/A' || movie.Poster == undefined ? '<p>No image available</p>' : `<img src="${movie.Poster}" style="width:300px" class="img-fluid">`}
            </div>
            <div class='col-12 col-md-8 my-3'>
                <h2>${movie.Title}</h2>
                <p><b>Plot:</b> ${movie.Plot}</p>
                <p><b>Duration:</b> ${movie.Runtime}</p>
                <p><b>Release Date: </b>${movie.Released}</p>
                <p><b>Actors:</b> ${movie.Actors}</p>
                <p><b>IMDB Rating:</b> ${movie.imdbRating}</p>
                <p><b>IMDB Votes:</b> ${movie.imdbVotes}</p>
                
                <p><b>Writer:</b> ${movie.Writer}</p>
                <p><b>Genre:</b> ${movie.Genre}</p>
                <p><b>Language:</b> ${movie.Language}</p>
                ${movie.Website == 'N/A' || movie.Website == undefined ? '' : `<p><b>Website:</b> <a href="${movie.Website}">${movie.Website}</a></p>`}
            </div>
            `;

        movieHtml.innerHTML = html;
    }

    function showError(message) {
        movieHtml.innerHTML = `<p class='mx-2'>${message}</p>`;
    }

    return {
        renderMovieDetails,
        showError,
    };
})();

// main.js
let pageUrl = window.location.href;
let params = (new URL(pageUrl)).searchParams;
const id = params.get('i');

updateUi();

async function updateUi() {
    try {
        const movie = await MovieService.getMovieById(id);

        if (movie.Response == 'True') {
            UIService.renderMovieDetails(movie);
        } else {
            UIService.showError(movie.Error);
        }
    } catch (error) {
        UIService.showError('Error fetching movie details:', error);
    }
}