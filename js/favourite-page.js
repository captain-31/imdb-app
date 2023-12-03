function setDeleteListener() {
    moviesTable.addEventListener('click', handleDeleteClick);
}

function handleDeleteClick(e) {
    if (e.target.classList.contains('delete-movie')) {
        e.preventDefault();
        const movieId = e.target.getAttribute('data-id');
        deleteMovieById(movieId);
    }
}

function deleteMovieById(movieId) {
    const moviesArray = getMoviesFromLocalStorage();

    // Remove record
    const filteredData = moviesArray.filter((movie) => movie.mId !== movieId);

    // Update local storage
    updateLocalStorage(filteredData);

    // Render UI
    updateHtml(filteredData);
}

function getMoviesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('imdbMovieData')) || [];
}

function updateLocalStorage(data) {
    localStorage.setItem('imdbMovieData', JSON.stringify(data));
}

function updateHtml(movies) {
    if (!movies || movies.length === 0) {
        renderNoMoviesMessage();
    } else {
        const html = movies.map((movie) => `
            <tr>
                <td>${getMovieImageHtml(movie.mImage)}</td>
                <td>${movie.mTitle}</td>
                <td><a href="#" data-id="${movie.mId}" class='delete-movie'>Delete</a></td>
            </tr>
        `).join('');

        renderMoviesTable(html);

        // Set delete button listener
        setDeleteListener();
    }
}

function renderNoMoviesMessage() {
    moviesTable.innerHTML = '<p class="text-center">No favourite movies found</p>';
}

function getMovieImageHtml(imageUrl) {
    return imageUrl == 'N/A' || imageUrl == undefined ? '<p>No image available</p>' : `<img src="${imageUrl}" style="width:80px">`;
}

function renderMoviesTable(html) {
    moviesTableData.innerHTML = html;
}

const moviesTableData = document.querySelector('.movies-list');
const moviesTable = document.querySelector('.table');
const moviesArray = getMoviesFromLocalStorage();
updateHtml(moviesArray);
setDeleteListener();