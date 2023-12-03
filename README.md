
# IMDB App

A mini IMDB clone app built using Vanilla javascript and Bootstrap. It uses data from OMDB API.

## Features

- Uses OMDB API
- Search movies and display results 
- Show movie details
- Add and remove functionality for favourite movies 


## Optimizations

There are different js files for different pages. This approach keeps the code modular and easier to manage. Each file focuses on the functionality related to a specific page.

The `index` script file:

- `MovieService` handles movie-related API requests.
- `FavoritesService` handles adding movies to favorites.
- `UIService` takes care of rendering movies, creating movie cards, showing loading messages, and activating listeners.


The `movie-detail` script file:

- `MovieService` handles the API request for movie details.
- `UIService` takes care of rendering movie details and showing errors.
- `updateUi` function is more focused on coordinating the flow.


The `favourite-page` script file:

- `handleDeleteClick` function focuses on handling the delete click event.
- Each function has a specific responsibility, making the code more readable and maintainable.
- Common tasks are extracted into separate functions for reusability.


This modular structure makes it easier to maintain, test, and understand each part of your application.


## Demo

http://url

